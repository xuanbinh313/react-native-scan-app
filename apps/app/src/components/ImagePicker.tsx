import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import type { ImagePickerResult } from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
// import { Image as CompressorImage } from 'react-native-compressor';
import { supabaseClient } from '@/lib/supabase';
export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraRollStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      aspect: [4, 3],
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };
  const compressImage = async (uri: string) => {
    const context = ImageManipulator.manipulate(uri);
    context.resize({ width: 800 }); // Resize to width of 800px, maintaining aspect ratio
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });
    console.log(result);
    return result.uri;
  };
  const handleImagePicked = async (pickerResult: ImagePickerResult) => {
    try {
      const cancelled = (pickerResult as any).cancelled ?? (pickerResult as any).canceled;
      if (cancelled) {
        return;
      } else {
        // Expo ImagePicker can return different shapes depending on SDK version.
        const uri = (pickerResult as any).uri ?? (pickerResult as any).assets?.[0]?.uri;
        if (!uri) {
          alert('Could not get image uri');
          return;
        }
        const compressedUri = await compressImage(uri);
        console.log('Compressed URI:', compressedUri);
        // Just set the preview image, don't upload yet
        setSelectedImageUri(uri);
      }
    } catch (e) {
      console.log(e);
      alert('Failed to select image');
    }
  };

  const handleUpload = async () => {
    if (!selectedImageUri) {
      alert('Please select an image first');
      return;
    }

    try {
      setUploading(true);
      setPercentage(0);

      const filename = `${Date.now()}.jpg`;
      const uploadUrl = await uploadImage(filename, selectedImageUri);
      downloadImage(uploadUrl);

      // Clear the selected image after successful upload
      setSelectedImageUri(null);
      alert('Upload successful!');
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (filename: string, fileUri: string) => {
    // Upload image to Supabase Storage
    const bucket = 'images';
    try {
      // For React Native, use fetch to get the file and FileReader to convert to base64
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Convert blob to base64 using FileReader
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove data:image/...;base64, prefix if present
          const base64 = base64String.includes(',') ? base64String.split(',')[1] : base64String;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Decode base64 to binary ArrayBuffer
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Upload the ArrayBuffer directly (Supabase supports this)
      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .upload(filename, bytes.buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (error) throw error;
      const { data: publicData } = supabaseClient.storage.from(bucket).getPublicUrl(filename);
      return publicData.publicUrl;
    } catch (err) {
      console.log('upload error', err);
      throw err;
    }
  };

  const setLoading = (progress: { loaded: number; total: number }) => {
    const calculated = Math.round((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };

  const updatePercentage = (num: number) => {
    setPercentage(num);
  };

  const downloadImage = (uri: string) => {
    // set the uploaded image public url
    setImage(uri);
  };

  const copyToClipboard = () => {
    image && Clipboard.setStringAsync(image);
    alert('Copied image URL to clipboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Upload Demo</Text>
      {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}

      {/* Preview selected image */}
      {selectedImageUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
          <Button
            onPress={handleUpload}
            title={uploading ? 'Uploading...' : 'Upload to Supabase'}
            disabled={uploading}
          />
        </View>
      )}

      {/* Show uploaded image */}
      {image && (
        <View style={styles.uploadedContainer}>
          <Text style={styles.uploadedLabel}>Uploaded Image:</Text>
          <Text style={styles.result} onPress={copyToClipboard}>
            <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
          </Text>
          <Text style={styles.info}>Long press to copy the image url</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={pickImage} title="Pick an image from camera roll" />
        <Button onPress={takePhoto} title="Take a photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  previewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 15,
    borderRadius: 8,
  },
  uploadedContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
  },
});

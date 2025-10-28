import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import type { ImagePickerResult } from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Image as CompressorImage } from 'react-native-compressor';
import { supabaseClient } from '@/lib/supabase';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);

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

  const handleImagePicked = async (pickerResult: ImagePickerResult) => {
    try {
      const cancelled = (pickerResult as any).cancelled ?? (pickerResult as any).canceled;
      if (cancelled) {
        alert('Upload cancelled');
        return;
      } else {
        setPercentage(0);
        // Expo ImagePicker can return different shapes depending on SDK version.
        const uri = (pickerResult as any).uri ?? (pickerResult as any).assets?.[0]?.uri;
        if (!uri) {
          alert('Could not get image uri');
          return;
        }

        // Resize / compress the image using react-native-compressor
        const compressedUri = await CompressorImage.compress(uri, {
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 0.8,
        });

        const img = await fetchImageFromUri(compressedUri);
        const filename = `${Date.now()}.jpg`;
        const uploadUrl = await uploadImage(filename, img);
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    }
  };

  const uploadImage = async (filename: string, img: Blob) => {
    // Upload blob to Supabase Storage
    const bucket = 'images';
    try {
      const { data, error } = await supabaseClient.storage.from(bucket).upload(filename, img, {
        cacheControl: '3600',
        upsert: true,
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

  const fetchImageFromUri = async (uri: string) => {
    // fetch a blob from the local file uri (file:// or content://)
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const copyToClipboard = () => {
    image && Clipboard.setStringAsync(image);
    alert('Copied image URL to clipboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AWS Storage Upload Demo</Text>
      {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}

      {image && (
        <View>
          <Text style={styles.result} onPress={copyToClipboard}>
            <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
          </Text>
          <Text style={styles.info}>Long press to copy the image url</Text>
        </View>
      )}

      <Button onPress={pickImage} title="Pick an image from camera roll" />
      <Button onPress={takePhoto} title="Take a photo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

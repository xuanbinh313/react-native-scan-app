import { useCompare } from '@/ctx/CompareContext';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal
} from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface CompareBottomSheetProps {
  // Any additional props if needed
}

export const CompareBottomSheet = forwardRef<BottomSheetModal, CompareBottomSheetProps>(
  (props, ref) => {
    const { selectedProducts, removeProduct, clearProducts } = useCompare();
    const router = useRouter();

    const handleCompare = () => {
      if (selectedProducts.length >= 2) {
        router.push('/(tabs)/compare');
      }
    };
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
        pressBehavior="none"
      />
    );
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const data = useMemo(
      () =>
        Array(50)
          .fill(0)
          .map((_, index) => `index-${index}`),
      []
    );
    const snapPoints = useMemo(() => ['10%', '25%'], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
      console.log('handleSheetChange', index);
    }, []);
    const handleSnapPress = useCallback((index) => {
      sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
      sheetRef.current?.close();
    }, []);

    // render
    const renderItem = useCallback(
      ({ item }) => (
        <View key={item.id} className="relative mr-3 w-28 rounded-xl bg-black-500 p-2">
          <TouchableOpacity
            onPress={() => removeProduct(item.id)}
            className="bg-danger absolute right-1 top-1 z-10 h-5 w-5 items-center justify-center rounded-full">
            <Text className="text-xs color-white">×</Text>
          </TouchableOpacity>
          {item.thumbnail ? (
            <Image
              source={{ uri: item.thumbnail }}
              className="mb-2 h-20 w-full rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="mb-2 h-20 w-full items-center justify-center rounded-lg bg-black-300">
              <Text className="text-xs color-black-200">No Image</Text>
            </View>
          )}
          <Text className="font-primary-medium text-xs color-black-main" numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      ),
      []
    );
    return (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChange}>
          <BottomSheetFlatList
            data={selectedProducts}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

CompareBottomSheet.displayName = 'CompareBottomSheet';

import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useCompare } from '@/ctx/CompareContext';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
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
    const snapPoints = useMemo(() => ['25%', '100%'], []);

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
      //   <GestureHandlerRootView style={styles.container}>
      //     <BottomSheetModalProvider>
      //       <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
      //       <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
      //         <BottomSheetView style={styles.contentContainer}>
      //           <View className="flex-1">
      //             <View className="mb-3 flex-row items-center justify-between px-4">
      //               <Text className="font-primary-bold text-base">
      //                 Selected ({selectedProducts.length})
      //               </Text>
      //               {selectedProducts.length > 0 && (
      //                 <TouchableOpacity onPress={clearProducts}>
      //                   <Text className="color-danger font-primary-medium text-sm">Clear All</Text>
      //                 </TouchableOpacity>
      //               )}
      //             </View>

      //             {selectedProducts.length === 0 ? (
      //               <View className="items-center justify-center px-4 py-4">
      //                 <Text className="text-center font-primary-regular text-xs color-black-200">
      //                   Tap on products to add them to comparison
      //                 </Text>
      //               </View>
      //             ) : (
      //               <View className="flex-1">
      //                 <ScrollView
      //                   horizontal
      //                   showsHorizontalScrollIndicator={false}
      //                   contentContainerStyle={styles.scrollContent}
      //                   className="flex-1">
      //                   {selectedProducts.map((product) => (
      //                     <View
      //                       key={product.id}
      //                       className="relative mr-3 w-28 rounded-xl bg-black-500 p-2">
      //                       <TouchableOpacity
      //                         onPress={() => removeProduct(product.id)}
      //                         className="bg-danger absolute right-1 top-1 z-10 h-5 w-5 items-center justify-center rounded-full">
      //                         <Text className="text-xs color-white">×</Text>
      //                       </TouchableOpacity>
      //                       {product.thumbnail ? (
      //                         <Image
      //                           source={{ uri: product.thumbnail }}
      //                           className="mb-2 h-20 w-full rounded-lg"
      //                           resizeMode="cover"
      //                         />
      //                       ) : (
      //                         <View className="mb-2 h-20 w-full items-center justify-center rounded-lg bg-black-300">
      //                           <Text className="text-xs color-black-200">No Image</Text>
      //                         </View>
      //                       )}
      //                       <Text
      //                         className="font-primary-medium text-xs color-black-main"
      //                         numberOfLines={2}>
      //                         {product.title}
      //                       </Text>
      //                     </View>
      //                   ))}

      //                   {selectedProducts.length >= 2 && (
      //                     <TouchableOpacity
      //                       onPress={handleCompare}
      //                       className="bg-primary mr-4 w-28 items-center justify-center rounded-xl p-2">
      //                       <Text className="text-2xl color-white">→</Text>
      //                       <Text className="mt-1 text-center font-primary-semibold text-xs color-white">
      //                         Compare
      //                       </Text>
      //                     </TouchableOpacity>
      //                   )}
      //                 </ScrollView>
      //               </View>
      //             )}
      //           </View>
      //         </BottomSheetView>
      //       </BottomSheetModal>
      //     </BottomSheetModalProvider>
      //   </GestureHandlerRootView>
      <GestureHandlerRootView style={styles.container}>
        {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
        <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
        <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} /> */}
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
      </GestureHandlerRootView>
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
  //   container: {
  //     flex: 1,
  //     padding: 24,
  //     justifyContent: 'center',
  //     backgroundColor: 'grey',
  //   },
  //   contentContainer: {
  //     flex: 1,
  //     alignItems: 'center',
  //   },
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

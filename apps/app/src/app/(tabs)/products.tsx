import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompare } from '@/ctx/CompareContext';
import { CompareBottomSheet } from '@/components/CompareBottomSheet';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function useProducts() {
  return useQuery({
    queryKey: ['products'], // Unique key for this query
    queryFn: async () => {
      const { data, error } = await supabaseClient.from('product').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });
}
function useCategories() {
  return useQuery({
    queryKey: ['categories'], // Unique key for this query
    queryFn: async () => {
      const { data, error } = await supabaseClient.from('product_category').select('name, id');
      if (error) throw new Error(error.message);
      return data;
    },
  });
}
export default function ProductsScreen() {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const { toggleProduct, isSelected, selectedProducts } = useCompare();

  if (isLoading) return <Text>Loading...</Text>;

  return (
      <GestureHandlerRootView className='flex-1'>
        <BottomSheetModalProvider>
          <ScrollView horizontal className="flex-none p-6" contentContainerClassName="gap-1">
            {categories?.map((category) => (
              <View
                key={category.id}
                className="h-9 w-fit items-center justify-center rounded-full border border-black-300 px-2">
                <Text>{category.name}</Text>
              </View>
            ))}
          </ScrollView>
          <FlatList
            className="bg-black-100 px-4"
            data={products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => {
              const selected = isSelected(item.id);
              return (
                <TouchableOpacity onPress={() => toggleProduct(item)} className="m-2 flex-1">
                  <View
                    className={`relative h-48 items-center rounded-xl bg-black-500 ${selected ? 'border-primary border-2' : ''}`}>
                    {selected && (
                      <View className="bg-primary absolute right-2 top-2 z-10 h-6 w-6 items-center justify-center rounded-full">
                        <Text className="text-xs color-white">✓</Text>
                      </View>
                    )}
                    {item.thumbnail && (
                      <Image
                        source={{ uri: item.thumbnail }}
                        className="w-full flex-1"
                        resizeMode="contain"
                      />
                    )}
                    <View className="w-full p-4">
                      <Text className="font-primary-semibold text-sm color-black-main">$89</Text>
                      <Text className="pt-1 font-primary-regular text-xs color-black-200">
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <CompareBottomSheet />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
}

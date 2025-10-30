import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import React from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

function useProducts() {
  return useQuery({
    queryKey: ['products'], // Unique key for this query
    queryFn: async () => {
      const { data, error } = await supabaseClient.from('product').select('title, thumbnail, id');
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
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex flex-1">
      <ScrollView horizontal className="flex-none p-6" contentContainerClassName="gap-1">
        {categories?.map((category) => (
          <View key={category.id} className="border-black-300 h-9 w-fit items-center justify-center rounded-full border px-2">
            <Text>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
      <FlatList
        className="px-4"
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="bg-black-500 m-2 h-48 flex-1 items-center rounded-xl">
            {item.thumbnail && (
              <Image
                source={{ uri: item.thumbnail }}
                className="w-full flex-1"
                resizeMode="contain"
              />
            )}
            <View className="w-full p-4">
              <Text className="font-primary-semibold color-black-main text-sm">$89</Text>
              <Text className="font-primary-regular color-black-200 pt-1 text-xs">
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

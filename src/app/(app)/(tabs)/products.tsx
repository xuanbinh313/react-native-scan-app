import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

function useProducts() {
  return useQuery({
    queryKey: ['products'], // Unique key for this query
    queryFn: async () => {
      const { data, error } = await supabaseClient.from('product').select('title, description, thumbnail, id');
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

export default function ProductsScreen() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className='flex flex-1'>
      <Text>ProductsScreen</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='border-x-fuchsia-50 p-2'>
            {item.thumbnail && <Image source={{ uri: item.thumbnail }} className='h-24 w-24' resizeMode='contain' />}
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

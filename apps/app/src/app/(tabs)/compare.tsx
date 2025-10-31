import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useCompare } from '@/ctx/CompareContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CompareScreen() {
  const { selectedProducts, removeProduct, clearProducts } = useCompare();
  const router = useRouter();

  if (selectedProducts.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-primary-bold color-black-main mb-4 text-center text-2xl">
            No Products to Compare
          </Text>
          <Text className="font-primary-regular color-black-200 mb-8 text-center">
            Go back to the products page and select at least 2 products to compare.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-primary rounded-xl px-8 py-4"
          >
            <Text className="font-primary-semibold color-white text-base">
              Back to Products
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Comparison attributes
  const attributes = [
    { key: 'thumbnail', label: 'Image' },
    { key: 'title', label: 'Product Name' },
    { key: 'description', label: 'Description' },
    { key: 'handle', label: 'Handle' },
    { key: 'weight', label: 'Weight' },
    { key: 'status', label: 'Status' },
    { key: 'discountable', label: 'Discountable' },
    { key: 'is_giftcard', label: 'Gift Card' },
    { key: 'created_at', label: 'Created Date' },
  ];

  const renderCell = (product: any, attribute: any) => {
    const value = product[attribute.key];

    if (attribute.key === 'thumbnail') {
      return value ? (
        <Image
          source={{ uri: value }}
          className="h-24 w-full rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="bg-black-500 h-24 w-full items-center justify-center rounded-lg">
          <Text className="color-black-200 text-xs">No Image</Text>
        </View>
      );
    }

    if (attribute.key === 'description') {
      return (
        <Text className="font-primary-regular color-black-main text-xs">
          {value || 'N/A'}
        </Text>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <View
          className={`rounded-full px-3 py-1 ${value ? 'bg-success/10' : 'bg-danger/10'}`}
        >
          <Text
            className={`font-primary-medium text-xs ${value ? 'color-success' : 'color-danger'}`}
          >
            {value ? 'Yes' : 'No'}
          </Text>
        </View>
      );
    }

    if (attribute.key === 'created_at' && value) {
      return (
        <Text className="font-primary-regular color-black-main text-xs">
          {new Date(value).toLocaleDateString()}
        </Text>
      );
    }

    return (
      <Text className="font-primary-regular color-black-main text-xs">
        {value || 'N/A'}
      </Text>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="border-black-500 flex-row items-center justify-between border-b px-6 py-4">
          <View className="flex-1">
            <Text className="font-primary-bold color-black-main text-xl">
              Compare Products
            </Text>
            <Text className="font-primary-regular color-black-200 mt-1 text-sm">
              {selectedProducts.length} products selected
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={clearProducts}
              className="border-danger rounded-lg border px-4 py-2"
            >
              <Text className="font-primary-medium color-danger text-sm">Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-black-500 rounded-lg px-4 py-2"
            >
              <Text className="font-primary-medium color-black-main text-sm">Back</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comparison Table */}
        <ScrollView className="flex-1" horizontal={false}>
          <ScrollView horizontal={true} className="flex-1">
            <View className="p-4">
              {/* Header Row with Product Names */}
              <View className="mb-4 flex-row">
                <View className="w-32 items-center justify-center">
                  <Text className="font-primary-semibold color-black-main text-sm">
                    Attributes
                  </Text>
                </View>
                {selectedProducts.map((product, index) => (
                  <View key={product.id} className="bg-primary/5 mx-1 w-48 rounded-xl p-3">
                    <View className="mb-2 flex-row items-start justify-between">
                      <Text className="font-primary-semibold color-primary flex-1 text-sm">
                        Product {index + 1}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeProduct(product.id)}
                        className="bg-danger/10 ml-2 h-6 w-6 items-center justify-center rounded-full"
                      >
                        <Text className="color-danger text-sm">×</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              {/* Comparison Rows */}
              {attributes.map((attribute, attrIndex) => (
                <View
                  key={attribute.key}
                  className={`flex-row border-black-500 py-3 ${attrIndex !== attributes.length - 1 ? 'border-b' : ''}`}
                >
                  {/* Attribute Label */}
                  <View className="w-32 justify-center pr-4">
                    <Text className="font-primary-semibold color-black-200 text-xs">
                      {attribute.label}
                    </Text>
                  </View>

                  {/* Product Values */}
                  {selectedProducts.map((product) => (
                    <View key={product.id} className="bg-black-500 mx-1 w-48 rounded-lg p-3">
                      {renderCell(product, attribute)}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>

        {/* Best Choice Indicator (Simple logic based on attributes) */}
        <View className="border-black-500 border-t p-4">
          <Text className="font-primary-semibold color-black-main mb-2 text-base">
            Quick Insights
          </Text>
          <View className="bg-accent/10 rounded-xl p-4">
            <Text className="font-primary-regular color-black-200 text-sm">
              • Compare features side by side to make the best choice
            </Text>
            <Text className="font-primary-regular color-black-200 mt-1 text-sm">
              • Products with more features highlighted in green
            </Text>
            <Text className="font-primary-regular color-black-200 mt-1 text-sm">
              • Tap × to remove a product from comparison
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
      <View className='flex-1'>
        <Text className="text-white">HomeScreen test nao</Text>
        <TouchableOpacity onPress={() => router.push('/test')}>
          <Text className="text-black-600 bg-blue-light font-primary-semibold rounded-2xl p-6 text-center text-base">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
  );
}

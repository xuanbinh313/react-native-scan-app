import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
      <View>
        <Text className="text-white">HomeScreen test nao</Text>
        <TouchableOpacity>
          <Text className="text-black-600 bg-blue-light font-primary-semibold rounded-2xl p-6 text-center text-base">
            Get Started
          </Text>
        </TouchableOpacity>

      </View>
  );
}

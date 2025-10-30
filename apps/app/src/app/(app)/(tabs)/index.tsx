import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import React from 'react';
import { EditScreenInfo } from '@/components/EditScreenInfo';
import { Container } from '@/components/Container';

export default function HomeScreen() {
  return (
    <Container>
      <View>
        <Text className="text-white">HomeScreen test nao</Text>
        <EditScreenInfo path="src/app/index.tsx" />
        <TouchableOpacity>
          <Text className="text-black-600 bg-blue-light font-primary-semibold rounded-2xl p-6 text-center text-base">
            Get Started
          </Text>
        </TouchableOpacity>

      </View>
    </Container>
  );
}

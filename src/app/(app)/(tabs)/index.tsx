import { View, Text } from 'react-native'
import React from 'react'
import { EditScreenInfo } from '@/components/EditScreenInfo'
import { Container } from '@/components/Container'

export default function HomeScreen() {
  return (
    <Container>
      <View>
        <Text className='text-white'>HomeScreen test nao</Text>
        <EditScreenInfo path="src/app/index.tsx" />
      </View>
    </Container>

  )
}
import { useAuth } from '@/ctx/AuthContext';
import React from 'react';
import { Text } from 'react-native';

export default function ProfileScreen() {
  const { session } = useAuth();
  return <>{session && session.user && <Text>{session.user.id}</Text>}</>;
}

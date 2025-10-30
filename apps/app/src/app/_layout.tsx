import { AuthProvider, useAuth } from '@/ctx/AuthContext';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

function RootContent() {
  const { session, loading } = useAuth();
  const router = useRouter();

  // Redirect khi chưa đăng nhập
  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [loading, session?.access_token]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <Slot />
  );
}

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
        <RootContent />
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

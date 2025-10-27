import { AuthProvider } from '@/ctx/AuthContext';
import { Slot } from 'expo-router';
import React from 'react';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function AppLayout() {
  // This layout can be deferred because it's not the root layout.
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </AuthProvider>
  );
}

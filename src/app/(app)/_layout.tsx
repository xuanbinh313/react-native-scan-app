import { useAuth } from '@/ctx/AuthContext';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function RootLayout() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Auth loading finished, session:', loading, session);
    if (!loading && !session) {
      router.replace('/login'); // chưa đăng nhập → về Login
    }
  }, [loading, session?.access_token]);
  return <Slot />;
}

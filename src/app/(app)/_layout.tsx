import { useAuth } from '@/ctx/AuthContext';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function RootLayout() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (session)
        router.replace('/'); // đã đăng nhập → về trang Home
      else router.replace('/login'); // chưa đăng nhập → về Login
    }
  }, [loading, session]);
  return <Slot />;
}

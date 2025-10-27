import { AuthProvider, useAuth } from '@/ctx/AuthContext';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import '../global.css';

export default function AppLayout() {


  // This layout can be deferred because it's not the root layout.
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

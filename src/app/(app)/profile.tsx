import { supabaseClient } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function profile() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  return <>{session && session.user && <Text>{session.user.id}</Text>}</>;
}

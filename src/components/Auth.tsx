import { supabaseClient } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import FormInput from './FormInput';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function signInWithEmail(values: LoginFormInputs) {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) Alert.alert(error.message);
    else router.replace('/profile')
    setLoading(false);
  }

  async function signUpWithEmail(values: LoginFormInputs) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <FormInput control={control} name="email"  />
        <FormInput control={control} name="password"  />
      </View>
      <View style={styles.verticallySpaced}>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={handleSubmit(signInWithEmail)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={handleSubmit(signUpWithEmail)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

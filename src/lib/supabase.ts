import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL as string
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY as string
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabaseClient.auth.startAutoRefresh()
    } else {
      supabaseClient.auth.stopAutoRefresh()
    }
  })
}
export { supabaseClient };
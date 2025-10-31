import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';

function CustomTabBar({ state }: BottomTabBarProps) {
  const router = useRouter();
  const tabs = [
    { name: '', icon: 'home-outline', label: 'Home' },
    { name: 'products', icon: 'pricetag-outline', label: 'Products' },
    { name: 'compare', icon: 'git-compare-outline', label: 'Compare' },
    { name: 'profile', icon: 'person-outline', label: 'Profile' },
  ];
  return (
    <View className="absolute bottom-0 left-0 right-0 h-16 flex-row items-center justify-around rounded-3xl bg-zinc-900 shadow-lg">
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(`/${tab.name}`)}
            className="items-center">
            <Ionicons name={tab.icon as any} size={24} color={isFocused ? '#fff' : '#666'} />
            <Text className={`mt-1 text-xs ${isFocused ? 'text-white' : 'text-zinc-500'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#222',
          height: 80,
          elevation: 5,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}>
    </Tabs>
  );
}

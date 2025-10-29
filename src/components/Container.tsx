import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <View className="flex-1 p-3">{children}</View>
    </SafeAreaProvider>
  );
};

const styles = {
  container: 'flex flex-1',
};

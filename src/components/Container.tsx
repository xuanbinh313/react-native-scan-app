import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaProvider className={styles.container}>{children}</SafeAreaProvider>;
};

const styles = {
  container: "flex flex-1"
};
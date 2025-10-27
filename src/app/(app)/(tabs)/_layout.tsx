import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="products">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Products</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

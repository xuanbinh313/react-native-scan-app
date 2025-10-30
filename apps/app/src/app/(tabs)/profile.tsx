import FormInput from '@/components/FormInput';
import ImagePickerComponent from '@/components/ImagePicker';
import { useAuth } from '@/ctx/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  phone: z.string(),
});
type LoginFormInputs = z.infer<typeof loginSchema>;
export default function ProfileScreen() {
  const { session } = useAuth();
  const { control, reset } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [isEditing, setIsEditing] = React.useState(false);
  // const onSubmit = (data) => console.log(data);
  useEffect(() => {
    if (session) {
      reset({
        email: session.user.email || '',
        phone: session.user.phone || '',
      });
    }
  }, [session?.access_token]);

  return (
    <View className="bg-blue-light flex flex-1 gap-3 p-5">
      <ScrollView>
        <ImagePickerComponent />
        <FormInput control={control} name="email" editable={isEditing} />
        <FormInput control={control} name="phone" editable={isEditing} />
        <TouchableOpacity>
          <Text className="bg-black-600 font-primary-semibold rounded-2xl p-6 text-center text-base text-black">
            Updated
          </Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

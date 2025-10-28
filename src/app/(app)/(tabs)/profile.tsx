import FormInput from '@/components/FormInput';
import { useAuth } from '@/ctx/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
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
    <View className='flex flex-1 gap-3'>
      <FormInput control={control} name="email" editable={isEditing} />
      <FormInput control={control} name="phone" editable={isEditing} />
    </View>
  );
}

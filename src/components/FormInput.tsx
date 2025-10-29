import React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TextInput } from 'react-native';

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends React.ComponentProps<typeof TextInput> {
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control'];
  name: TName;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({ control, name, ...rest }: FormInputProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <>
          <TextInput
            className="bg-blue-dark text-black-600 rounded-full p-5"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
          {fieldState.invalid && <Text>{fieldState.error?.message}</Text>}
        </>
      )}
    />
  );
}

export default FormInput;

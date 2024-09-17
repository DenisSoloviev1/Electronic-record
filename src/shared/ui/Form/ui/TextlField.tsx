import { HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { InputField } from '@/shared/ui';

interface FormEmailFieldParams {
  error: string;
  field: ControllerRenderProps;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

export const FormTextField = ({
  error,
  field,
  type,
  placeholder,
  label,
}: FormEmailFieldParams) => {
  return (
    <InputField
      fullWidth
      label={label}
      placeholder={placeholder}
      type={type}
      error={!!error}
      {...field}
    />
  );
};

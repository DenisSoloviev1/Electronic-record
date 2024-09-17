import { ControllerRenderProps } from 'react-hook-form';
import {
  FieldsKey,
  FormTextField,
  textFieldStaticData,
} from '@/shared/ui/Form';

interface FormFieldProps {
  fieldValue: FieldsKey;
  field: ControllerRenderProps;
  error: string;
}

export const FormField = ({ fieldValue, field, error }: FormFieldProps) => {
  switch (fieldValue) {
    case 'email':
    case 'phone':
    case 'contact_name':
      return (
        <FormTextField
          {...textFieldStaticData[fieldValue]}
          error={error}
          field={field}
        />
      );
    default:
      return <></>;
  }
};

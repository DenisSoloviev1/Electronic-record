import { memo } from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import { Error, FormItem } from '../style';
import { FieldsKey } from '../validator';

interface FormControlParams extends Omit<ControllerProps, 'control' | 'name'> {
  field: FieldsKey;
  error: string;
  control: unknown;
}

export const FormControl = memo(
  ({ field, error, control, ...rest }: FormControlParams) => {
    return (
      <FormItem>
        <Controller name={field} control={control as Control} {...rest} />

        {error && <Error>{error}</Error>}
      </FormItem>
    );
  },
);

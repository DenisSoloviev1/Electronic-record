import { PropsWithChildren } from 'react';

import { StyledForm } from '@/shared/ui/Form/style';

interface Params {
  submitFn: any;
}

export const Form = ({ children, submitFn }: PropsWithChildren<Params>) => {
  return <StyledForm onSubmit={submitFn}>{children}</StyledForm>;
};

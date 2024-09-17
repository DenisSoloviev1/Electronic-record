import { memo, PropsWithChildren } from 'react';
import { isMobile } from '@/shared/lib';
import { Flex } from '@/shared/ui';
import { FormItem } from '../style';

export const FormDateTimeField = memo(({ children }: PropsWithChildren) => {
  return (
    <FormItem>
      <Flex
        $direction={isMobile ? 'column' : 'row'}
        $gap={15}
        $justify="flex-start"
      >
        {children}
      </Flex>
    </FormItem>
  );
});

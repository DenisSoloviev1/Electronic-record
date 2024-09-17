import { Select } from '@/shared/ui';
import { RequestsListDTO } from '../../model/types';

interface RequestsSearchProps {
  fields: Required<RequestsListDTO>[];
}

export const RequestsSearch = ({ fields }: RequestsSearchProps) => {
  return <Select options={fields} label={'Услуга'} id={'#search-requests'} />;
};

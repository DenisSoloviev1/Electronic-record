import { AutocompleteChangeReason } from '@mui/material';
import { FC, SyntheticEvent } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Select } from '@/shared/ui';
import { OptionStruct } from '@/shared/ui/Select';
import { DivisionsApi, DivisionsModel } from '..';

interface DivisionsDropdownParams {
  label?: string;
}

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

export const DivisionsDropdown: FC<DivisionsDropdownParams> = ({
  label = 'Ваше подразделение',
  ...props
}) => {
  const { filter, setFilter, clearFilter } = DivisionsModel.useDivisionsStore();
  
  const { data: divisions, isLoading, isError } = useQuery({
    queryKey: [DivisionsApi.QueryReqName.getDivisions, {}],
    queryFn: DivisionsApi.getDivisions,
    refetchOnWindowFocus: false,
  });

  const handleChange = (
    _: SyntheticEvent,
    newValue: NonNullable<OptionStruct | string> | (string | OptionStruct)[] | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (reason === 'clear') {
      clearFilter();
    } else if (newValue && typeof newValue !== 'string' && !Array.isArray(newValue)) {
      setFilter({ id: newValue.id, name: newValue.name });
    }
  };

  let selectOptions: OptionStruct[] = [];
  
  if (isLoading) {
    selectOptions = [{ id: -1, name: 'Загрузка данных...' }]; 
  } else if (isError) {
    selectOptions = [{ id: -2, name: 'Ошибка загрузки данных' }]; 
  } else if (divisions?.results) {
    selectOptions = divisions.results;
  }

  return (
    <SelectContainer>
      <Select
        multiple={false}
        onChange={handleChange}
        inputValue={filter.name || ''} 
        value={selectOptions.find(option => option.name === filter.name) || null} 
        label={label}
        id="select-divisions"
        options={selectOptions} 
        {...props}
      />
    </SelectContainer>
  );
};

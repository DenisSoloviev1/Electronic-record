import { AutocompleteChangeReason } from '@mui/material';
import { FC, SyntheticEvent } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Select } from '@/shared/ui';
import { OptionStruct } from '@/shared/ui/Select';
import { TypeOfRequestsApi, TypeOfRequestsModel } from '..';

interface TypeOfRequestDropdownParams {
  label?: string;
}

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

export const TypeOfRequestDropdown: FC<TypeOfRequestDropdownParams> = ({
  label="Тип заявки",
  ...props
}) => {
  const { filter, setFilter, clearFilter } =
  TypeOfRequestsModel.useTypeOfRequestsStore();

  const { data: typeOfRequest, isLoading, isError  } = useQuery({
    queryKey: [TypeOfRequestsApi.QueryReqName.getTypeOfRequest, {}],
    queryFn: TypeOfRequestsApi.getTypeOfRequests,
    refetchOnWindowFocus: false,
  });

  const handleChange = (
    _: SyntheticEvent,
    newValue:
      | NonNullable<OptionStruct | string>
      | (string | OptionStruct)[]
      | null,
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
    selectOptions = [{ id: -1, name: 'Загрузка данных...' }]; // Используем -1 для загрузки
  } else if (isError) {
    selectOptions = [{ id: -2, name: 'Ошибка загрузки данных' }]; // Используем -2 для ошибки
  } else if (typeOfRequest?.results) {
    selectOptions = typeOfRequest.results;
  }

  return (
    <SelectContainer>
      <Select
        multiple={false}
        onChange={handleChange}
        inputValue={filter.name || ''}
        value={selectOptions.find(option => option.name === filter.name) || null}
        label={label}
        id="select-type-of-request"
        options={selectOptions}
        {...props}
      />
    </SelectContainer>
  );
};

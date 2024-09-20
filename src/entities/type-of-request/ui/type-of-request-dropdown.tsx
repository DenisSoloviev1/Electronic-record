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
  TypeOfRequestsModel.useDepartmentsStore();
  const { data: departments } = useQuery({
    queryKey: [TypeOfRequestsApi.QueryReqName.getTypeOfRequest, {}],
    queryFn: TypeOfRequestsApi.getDepartments,
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
    if (newValue && typeof newValue !== 'string' && !Array.isArray(newValue)) {
      if (reason === 'clear') {
        clearFilter();
      } else {
        setFilter({ id: newValue.id, name: newValue.name });
      }
    }
  };

  return (
    <SelectContainer>
      <Select
        multiple={false}
        onChange={handleChange}
        inputValue={filter.name}
        value={filter.name || null}
        label={label}
        id="select-departments"
        options={departments?.results || []}
        {...props}
      />
    </SelectContainer>
  );
};

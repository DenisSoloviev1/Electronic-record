import { AutocompleteChangeReason } from '@mui/material';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Select } from '@/shared/ui';
import { OptionStruct } from '@/shared/ui/Select';
import { CertificationModel } from '..';

const certs = [
  {
    id: 1,
    name: 'Копия приказа о приеме на работу',
  },
  {
    id: 2,
    name: 'Копия приказов о переводах на другую работу',
  },
  {
    id: 3,
    name: 'Копия приказа об увольнении с работы',
  },
  {
    id: 4,
    name: 'Выписки из трудовой книжки',
  },
  {
    id: 5,
    name: 'Справка о заработной плате',
  },
  {
    id: 6,
    name: 'Справка о начисленных и фактически уплаченных страховых взносах на обязательное пенсионное страхование',
  },
  {
    id: 7,
    name: 'Справка о периоде работы у данного работодателя',
  },
  {
    id: 8,
    name: 'Справка о доходах физического лица по форме 2-НДФЛ',
  },
  {
    id: 10,
    name: 'Справка о среднем заработке за последние три месяца',
  },
  {
    id: 11,
    name: 'Справка о сумме заработка за два календарных года, предшествующих году прекращения работы',
  },
  {
    id: 12,
    name: 'Копия сведений персонифицированного учета, индивидуальных сведений и сведений о трудовом (страховом) стаже',
  },
];

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

export const CertificationDropdown = () => {
  const { filter, setFilter, clearFilter } =
    CertificationModel.useCertificationStore();

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
        id="cert-types"
        label="Тип заявки"
        options={certs}
        onChange={handleChange}
        inputValue={filter.name}
        value={filter.name || null}
      />
    </SelectContainer>
  );
};

import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  Paper,
} from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getDivisions, QueryReqName } from "@/entities/divisions/api";
import { DivisionsModel } from "..";
import { useAuthStore } from "@/entities/auth";
import { RolesDict } from "@/shared/types";
import { OptionStruct } from "@/shared/ui/Select";

interface DivisionsDropdownParams {
  label?: string;
}

const SelectContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: #f1f4f9;
`;

export const DivisionsDropdown: FC<DivisionsDropdownParams> = ({
  label = "Ваше подразделение",
  ...props
}) => {
  const { filter, setFilter, clearFilter } = DivisionsModel.useDivisionsStore();
  const [inputValue, setInputValue] = useState(filter.name || "");
  const { role } = useAuthStore();

  const authToken = localStorage.getItem("authToken") ?? "";

  const {
    data: divisions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      QueryReqName.getDivisions,
      { limit: 600, offset: 0, search: "", role, authToken }, // можно поставить лимит для количества полей
    ],
    queryFn: getDivisions,
    refetchOnWindowFocus: false,
  });

  const handleChange = (
    _: SyntheticEvent,
    newValue: OptionStruct | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "clear") {
      clearFilter();
      setInputValue("");
    } else if (newValue) {
      setFilter({ id: newValue.id, name: newValue.name });
    }
  };

  // Фильтрация опций для исключения поля "Соискатель"
  let selectOptions: OptionStruct[] = [];

  if (isLoading) {
    selectOptions = [{ id: -1, name: "Загрузка данных..." }];
  } else if (isError) {
    selectOptions = [{ id: -2, name: "Ошибка загрузки данных" }];
  } else if (divisions?.results) {
    selectOptions = divisions.results.filter(
      (option) => option.name !== "Соискатель"
    );
  }

  return (
    <SelectContainer>
      <Autocomplete
        multiple={false}
        options={selectOptions}
        getOptionLabel={(option) => option.name}
        value={
          filter.name !== "Соискатель"
            ? selectOptions.find((option) => option.name === filter.name) ||
              null
            : null
        }
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText={
          isLoading
            ? "Загрузка данных..."
            : isError
              ? "Ошибка загрузки данных"
              : "Нет данных"
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              label && role === RolesDict.STUDENT ? "Ваш факультет" : label
            }
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              sx: { borderRadius: "16px" },
            }}
          />
        )}
        PaperComponent={(props) => (
          <Paper {...props} style={{ borderRadius: "16px" }} />
        )}
        {...props}
      />
    </SelectContainer>
  );
};

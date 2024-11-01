import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  Paper,
} from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTypeOfRequests, QueryReqName } from "@/entities/type-of-request/api";
import { TypeOfRequestsModel } from "..";
import { OptionStruct } from "@/shared/ui/Select";
import { useAuthStore } from "@/entities/auth";
import { RolesDict } from '@/shared/types';

interface TypeOfRequestDropdownParams {
  label?: string;
}

const SelectContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: #f1f4f9;
`;

export const TypeOfRequestDropdown: FC<TypeOfRequestDropdownParams> = ({
  label = "Тип заявки",
  ...props
}) => {
  const { filter, setFilter, clearFilter } =
    TypeOfRequestsModel.useTypeOfRequestsStore();
  const [inputValue, setInputValue] = useState(filter.name || "");
  const roleKey = useAuthStore((state) => state.role) as keyof typeof RolesDict;
  const role = RolesDict[roleKey]; 

  const authToken = localStorage.getItem("authToken") ?? "";

  const {
    data: typeOfRequest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryReqName.getTypeOfRequest, { limit: 10, offset: 0, search: '', role, authToken  }], // Передаем роль в запрос
    queryFn: getTypeOfRequests,
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

  let selectOptions: OptionStruct[] = [];

  if (isLoading) {
    selectOptions = [{ id: -1, name: "Загрузка данных..." }];
  } else if (isError) {
    selectOptions = [{ id: -2, name: "Ошибка загрузки данных" }];
  } else if (typeOfRequest?.results) {
    selectOptions = typeOfRequest.results;
  }

  return (
    <SelectContainer>
      <Autocomplete
        multiple={false}
        options={selectOptions}
        getOptionLabel={(option) => option.name}
        value={
          selectOptions.find((option) => option.name === filter.name) || null
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
            label={label}
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

import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  Paper,
} from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { TypeOfRequestsApi, TypeOfRequestsModel } from "..";
import { OptionStruct } from "@/shared/ui/Select";

interface TypeOfRequestDropdownParams {
  label?: string;
}

const SelectContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 16px; // Закругление контейнера
  background-color: #f1f4f9;
`;

export const TypeOfRequestDropdown: FC<TypeOfRequestDropdownParams> = ({
  label = "Тип заявки",
  ...props
}) => {
  const { filter, setFilter, clearFilter } =
    TypeOfRequestsModel.useTypeOfRequestsStore();
  const [inputValue, setInputValue] = useState(filter.name || "");

  const {
    data: typeOfRequest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TypeOfRequestsApi.QueryReqName.getTypeOfRequest, {}],
    queryFn: TypeOfRequestsApi.getTypeOfRequests,
    refetchOnWindowFocus: false,
  });

  const handleChange = (
    _: SyntheticEvent,
    newValue: OptionStruct | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "clear") {
      clearFilter();
      setInputValue(""); // Очистить поле ввода
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
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)} // Обновляем значение поля ввода
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
              sx: { borderRadius: "16px" }, // Закругление поля ввода через sx
            }}
          />
        )}
        PaperComponent={(props) => (
          <Paper {...props} style={{ borderRadius: "16px" }} /> // Закругление выпадающего списка
        )}
        {...props}
      />
    </SelectContainer>
  );
};

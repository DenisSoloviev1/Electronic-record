import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CalendarModel, DateRange, TimeRange } from "@/entities/calendar";
import {
  TypeOfRequestDropdown,
  TypeOfRequestsModel,
} from "@/entities/type-of-request";
import { DivisionsDropdown, DivisionsModel } from "@/entities/divisions";
import { isMobile } from "@/shared/lib";
import { CertApi } from "@/entities/certification";
import { ICert, RolesDict } from "@/shared/types";
import { AuthModel } from "@/entities/auth";
import { CertCreationDto } from "@/entities/certification/model/types.ts";
import { Flex, Modal, SubmitButton } from "@/shared/ui";
import {
  createSchema,
  FieldsKey,
  Form,
  FormControl,
  FormDateTimeField,
  FormField,
} from "@/shared/ui/Form";
import { AssentP, AssentA } from "@/pages/ui/main";

const fields = ["contact_name", "email", "phone", "date"] as FieldsKey[];

const zodSchema = createSchema(fields);

const Student = () => {
  const role = AuthModel.useAuthStore(
    (state) => state.role
  ) as keyof typeof RolesDict;

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ICert>({
    resolver: zodResolver(zodSchema),
    mode: "onSubmit",
  });

  const { resetDateTime, time, startDate } = CalendarModel.useCalendarStore(); // Для проверки даты и времени
  const { filter: divisionFilter, clearFilter: clearDivision } =
    DivisionsModel.useDivisionsStore(); // Для проверки подразделения
  const { filter: typeOfRequestFilter, clearFilter: clearTypeOfRequest } =
    TypeOfRequestsModel.useTypeOfRequestsStore(); // Для проверки типа обращения

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Получаем текущие значения полей формы
  const contactName = watch("contact_name");
  const email = watch("email");
  const phone = watch("phone");

  // Проверка заполненности всех полей, включая выпадающие списки и календарь
  const validateForm = () => {
    if (!contactName || !email || !phone) {
      setErrorMessage("Пожалуйста, заполните все обязательные поля.");
      return false;
    }

    if (!divisionFilter?.id) {
      setErrorMessage("Пожалуйста, выберите ваше подразделение.");
      return false;
    }
    if (!typeOfRequestFilter?.id) {
      setErrorMessage("Пожалуйста, выберите тип заявки.");
      return false;
    }

    if (!time || !startDate) {
      setErrorMessage("Пожалуйста, выберите дату и время.");
      return false;
    }

    return true;
  };

  const { isLoading: isPending, mutate } = useMutation({
    mutationKey: [CertApi.QueryReqName.createCert],
    mutationFn: CertApi.createCert,
  });

  // Функция отправки данных на сервер
  const onSubmit: SubmitHandler<ICert> = (vals: unknown) => {
    if (!validateForm()) {
      return; // Если форма невалидна, не продолжаем выполнение
    }

    const mutationValues = vals as CertCreationDto;
    const dateTime = time.split(":");
    const date = new Date(startDate);
    const dateWithTime = new Date(
      date.setHours(+dateTime[0], +dateTime[1]) - 60 * 60 * 1000
    );

    mutationValues["date"] = dateWithTime.toJSON();
    mutationValues["division"] = divisionFilter.id;
    mutationValues["type"] = typeOfRequestFilter.id;
    mutationValues["department"] = 10;

    // Форматируем номер телефона
    if (phone) {
      // Удаляем все символы, кроме цифр
      const cleanPhone = phone.replace(/\D/g, "");
      // Если номер начинается с '7', заменяем на '8'
      if (cleanPhone.startsWith("7")) {
        mutationValues["phone"] = "8" + cleanPhone.slice(1);
      } else if (cleanPhone.startsWith("8")) {
        mutationValues["phone"] = cleanPhone; // Номер уже начинается с 8
      } else {
        mutationValues["phone"] = cleanPhone; // Номер не начинается с 7 или 8
      }

      // Проверяем длину номера
      if (
        mutationValues["phone"].length < 8 ||
        mutationValues["phone"].length > 14
      ) {
        setErrorMessage("Телефон должен содержать от 8 до 14 цифр.");
        return; // Возвращаемся, чтобы предотвратить отправку
      }
    } else {
      mutationValues["phone"] = null;
    }

    mutate(mutationValues, {
      onSuccess: () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
        resetDateTime();
        clearDivision();
        clearTypeOfRequest();
        reset({
          contact_name: "",
          phone: "",
          email: "",
          date: "",
        });
        setErrorMessage("");
      },
    });
  };

  return (
    <>
      <Form submitFn={handleSubmit(onSubmit)}>
        <DivisionsDropdown />
        <TypeOfRequestDropdown role={role}/>

        <FormControl
          field={"contact_name" as FieldsKey}
          error={errors["contact_name"]?.message || ""}
          control={control}
          render={({ field }) => (
            <FormField
              fieldValue={"contact_name" as FieldsKey}
              error={errors["contact_name"]?.message || ""}
              field={field}
            />
          )}
        />

        <Flex
          $direction={isMobile ? "column" : "row"}
          $gap={15}
          $justify="space-between"
          $align="flex-start"
        >
          <FormControl
            field={"email" as FieldsKey}
            error={errors["email"]?.message || ""}
            control={control}
            render={({ field }) => (
              <FormField
                fieldValue={"email" as FieldsKey}
                error={errors["email"]?.message || ""}
                field={field}
              />
            )}
          />

          <FormControl
            field={"phone" as FieldsKey}
            error={errors["phone"]?.message || ""}
            control={control}
            render={({ field }) => (
              <FormField
                fieldValue={"phone" as FieldsKey}
                error={errors["phone"]?.message || ""}
                field={field}
              />
            )}
          />
        </Flex>

        <FormDateTimeField>
          <DateRange />
          <TimeRange />
        </FormDateTimeField>

        <AssentP>
          <label>
            Нажимая кнопку "Отправить", Вы даёте свое &nbsp;
            <AssentA href="/public/Согласие-на-обработку.pdf" download>
              Согласие на обработку персональных данных
            </AssentA>
            &nbsp;в соответствии с Федеральным Законом №152-ФЗ от 27.07.2006 "О
            персональных данных".
          </label>
        </AssentP>

        <SubmitButton
          label="Отправить"
          loading={isPending}
          disabled={isPending}
        />

        {errorMessage && (
          <div
            style={{
              color: "#e44444",
              marginTop: "0.5rem",
              fontWeight: "600",
              fontSize: "0.75rem",
            }}
          >
            {errorMessage}
          </div>
        )}
      </Form>

      <Modal isOpen={isOpen} />
    </>
  );
};

export default Student;

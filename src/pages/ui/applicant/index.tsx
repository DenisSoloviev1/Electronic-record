import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CalendarModel, DateRange, TimeRange } from "@/entities/calendar";
import { useChekTimeApiStore } from "@/entities/calendar/model";
import {
  TypeOfRequestDropdown,
  TypeOfRequestsModel,
} from "@/entities/type-of-request";
import { isMobile } from "@/shared/lib";
import { RequestCreate } from "@/oapi/main";
import { IRequest } from "@/shared/types";
import { Flex, Modal, SubmitButton } from "@/shared/ui";
import {
  createSchema,
  FieldsKey,
  Form,
  FormControl,
  FormDateTimeField,
  FormField,
} from "@/shared/ui/Form";
import { AssentP, Link } from "@/pages/ui/main";
import { baseUrl } from "@/shared/config";

const fields = ["contact_name", "email", "phone", "date"] as FieldsKey[];
const zodSchema = createSchema(fields);

const Applicant = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IRequest>({
    resolver: zodResolver(zodSchema),
    mode: "onSubmit",
  });

  const { setDepartment, setDivision, setType, setDateRequest } =
    useChekTimeApiStore();
  const { resetDateTime, time, startDate } = CalendarModel.useCalendarStore();
  const { filter: typeOfRequestFilter, clearFilter: clearTypeOfRequest } =
    TypeOfRequestsModel.useTypeOfRequestsStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const contactName = watch("contact_name");
  const email = watch("email");
  const phone = watch("phone");

  const validateForm = () => {
    if (!contactName || !email || !phone) {
      setErrorMessage("Пожалуйста, заполните все обязательные поля.");
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

  useEffect(() => {
    if (typeOfRequestFilter?.id && startDate) {
      const date = new Date(startDate);
      const formattedDate = date.toISOString().split("T")[0];

      setDepartment(11);
      setDivision(6);
      setType(typeOfRequestFilter.id);
      setDateRequest(formattedDate);
    }
  }, [typeOfRequestFilter, startDate]);

  const { isLoading: isPending, mutate } = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: async (data: RequestCreate) => {
      return await axios.post(`${baseUrl}/api/requests/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
    },
  });

  const onSubmit: SubmitHandler<IRequest> = (vals) => {
    if (!validateForm()) return;

    const [hours, minutes] = time.split(":").map(Number);
    const localDate = new Date(startDate);
    localDate.setHours(hours, minutes, 0, 0);

    // Форматируем дату и время в локальный формат, исключая временную зону
    const formattedLocalDate = `${localDate.getFullYear()}-${String(
      localDate.getMonth() + 1
    ).padStart(2, "0")}-${String(localDate.getDate()).padStart(
      2,
      "0"
    )}T${String(localDate.getHours()).padStart(2, "0")}:${String(
      localDate.getMinutes()
    ).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")}`;

    const mutationValues: IRequest = {
      ...vals,
      department: 11,
      division: 6,
      type: typeOfRequestFilter.id,
      date: formattedLocalDate,
    };

    // Форматируем номер телефона
    const cleanPhone = phone.replace(/\D/g, "");
    mutationValues.phone = cleanPhone.startsWith("7")
      ? "8" + cleanPhone.slice(1)
      : cleanPhone.startsWith("8")
        ? cleanPhone
        : cleanPhone;

    if (mutationValues.phone.length < 8 || mutationValues.phone.length > 14) {
      setErrorMessage("Телефон должен содержать от 8 до 14 цифр.");
      return;
    }

    mutate(mutationValues, {
      onSuccess: () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
        resetDateTime();
        clearTypeOfRequest();
        reset({ contact_name: "", phone: "", email: "", date: "" });
        setErrorMessage("");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ non_field_errors?: string[] }>;

        const errorMessage = axiosError.response?.data?.non_field_errors?.[0];

        setErrorMessage(
          errorMessage
            ? `Произошла ошибка при отправке. ${errorMessage}`
            : "Произошла ошибка при отправке, попробуйте ещё раз."
        );
      },
    });
  };

  return (
    <>
      <Form submitFn={handleSubmit(onSubmit)}>
        <TypeOfRequestDropdown />

        <FormControl
          field={"contact_name" as FieldsKey}
          error={errors.contact_name?.message || ""}
          control={control}
          render={({ field }) => (
            <FormField
              fieldValue={"contact_name" as FieldsKey}
              error={errors.contact_name?.message || ""}
              field={field}
            />
          )}
        />

        <Flex
          $direction={isMobile ? "column" : "row"}
          $gap={isMobile ? 0 : 15}
          $justify="space-between"
          $align="flex-start"
        >
          <FormControl
            field={"email" as FieldsKey}
            error={errors.email?.message || ""}
            control={control}
            render={({ field }) => (
              <FormField
                fieldValue={"email" as FieldsKey}
                error={errors.email?.message || ""}
                field={field}
              />
            )}
          />

          <FormControl
            field={"phone" as FieldsKey}
            error={errors.phone?.message || ""}
            control={control}
            render={({ field }) => (
              <FormField
                fieldValue={"phone" as FieldsKey}
                error={errors.phone?.message || ""}
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
            <Link href="/public/Согласие-на-обработку.pdf" target="_blanck">
              Согласие на обработку персональных данных
            </Link>
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

export default Applicant;

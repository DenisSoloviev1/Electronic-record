import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CalendarModel, DateRange, TimeRange } from "@/entities/calendar";
import { useChekTimeApiStore } from "@/entities/calendar/model";
import {
  TypeOfRequestDropdown,
  TypeOfRequestsModel,
} from "@/entities/type-of-request";
import { DivisionsDropdown, DivisionsModel } from "@/entities/divisions";
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

const fields = ["contact_name", "email", "phone", "date"] as FieldsKey[];
const zodSchema = createSchema(fields);

const Employee = () => {
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
  const { filter: divisionFilter, clearFilter: clearDivision } =
    DivisionsModel.useDivisionsStore();
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

  useEffect(() => {
    if (divisionFilter?.id && typeOfRequestFilter?.id && startDate) {
      const date = new Date(startDate);
      // date.setDate(date.getDate() + 1);
      const formattedDate = date.toISOString().split("T")[0];

      setDepartment(8);
      setDivision(divisionFilter.id);
      setType(typeOfRequestFilter.id);
      setDateRequest(formattedDate);
    }
  }, [divisionFilter, typeOfRequestFilter, startDate]);

  const { isLoading: isPending, mutate } = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: async (data: RequestCreate) => {
      // указать API для создания заявки
      return await fetch("/your-api-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  });

  const onSubmit: SubmitHandler<IRequest> = (vals) => {
    if (!validateForm()) return;

    const mutationValues: IRequest = {
      ...vals,
      department: 8,
      division: divisionFilter.id,
      typeOfRequest: typeOfRequestFilter.id,
      date: new Date(
        new Date(startDate).setHours(+time.split(":")[0], +time.split(":")[1]) -
          60 * 60 * 1000
      ).toJSON(),
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
        <TypeOfRequestDropdown />
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
            <Link href="/public/Согласие-на-обработку.pdf" download>
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

export default Employee;

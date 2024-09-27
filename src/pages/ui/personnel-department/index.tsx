import { zodResolver } from "@hookform/resolvers/zod"; 
import { useState } from "react"; 
import { useForm } from "react-hook-form"; 
import { useMutation } from "react-query"; 
import { CalendarModel, DateRange, TimeRange } from "@/entities/calendar"; 
import { CertApi } from "@/entities/certification"; 
import { TypeOfRequestDropdown, TypeOfRequestsModel } from "@/entities/type-of-request"; 
import { CertCreationDto } from "@/entities/certification/model/types.ts"; 
import { DepartmentsDropdown, DepartmentsModel } from "@/entities/departments"; 
import { isMobile } from "@/shared/lib"; 
import { ICert } from "@/shared/types"; 
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

const PersonnelDepartment = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch, // Следим за полями формы
  } = useForm<ICert>({
    resolver: zodResolver(zodSchema),
    mode: "onSubmit",
  });

  const { resetDateTime, time, startDate } = CalendarModel.useCalendarStore(); // Для проверки даты и времени
  const { filter: departmentFilter, clearFilter: clearDepartment } =
    DepartmentsModel.useDepartmentsStore(); // Для проверки департамента
    const { filter: typeOfRequestFilter, clearFilter: clearTypeOfRequest } = 
    TypeOfRequestsModel.useTypeOfRequestsStore(); // Для проверки типа обращения

  const { isLoading: isPending, mutate } = useMutation({
    mutationKey: [CertApi.QueryReqName.createCert],
    mutationFn: CertApi.createCert,
  });

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

    if (!departmentFilter?.id) {
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

  const onSubmit = (vals: unknown) => {
    // Проверяем все поля формы, перед тем как продолжить
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
    mutationValues["department"] = departmentFilter.id;

    mutate(mutationValues, {
      onSuccess: () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
        resetDateTime();
        clearDepartment();
        clearTypeOfRequest();
        reset({
          contact_name: "",
          phone: "",
          email: "",
          date: "",
        });
        setErrorMessage(""); // Сбрасываем сообщение об ошибке при успешной отправке
      },
    });
  };

  return (
    <>
      <Form submitFn={handleSubmit(onSubmit)}>
        <DepartmentsDropdown />
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
        
        {/* Показываем сообщение об ошибке, если форма невалидна */}
        {errorMessage && (
          <div style={{ color: "#e44444", marginTop: "0.5rem", fontWeight: "600", fontSize: "0.75rem"}}>
            {errorMessage}
          </div>
        )}
      </Form>

      <Modal isOpen={isOpen} />
    </>
  );
};

export default PersonnelDepartment;

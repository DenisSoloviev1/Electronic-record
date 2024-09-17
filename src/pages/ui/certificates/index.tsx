import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CalendarModel, DateRange, TimeRange } from "@/entities/calendar";
import {
  CertApi,
  CertificationDropdown,
  CertificationModel,
} from "@/entities/certification";
import { CertCreationDto } from "@/entities/certification/model/types.ts";
import { DepartmentsModel } from "@/entities/departments";
import { isMobile } from "@/shared/lib";
import { ICert } from "@/shared/types";
import { Flex, Modal, SubmitButton } from "@/shared/ui";
import {
  createSchema,
  FormControl,
  FormDateTimeField,
  FormField,
  Form,
  FieldsKey,
} from "@/shared/ui/Form";
import { AssentP, AssentA } from "@/pages/ui/main";


const fields = [
  "department",
  "type",
  "contact_name",
  "email",
  "phone",
  "date",
] as FieldsKey[];

const zodSchema = createSchema(fields);

const Certificates = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICert>({
    resolver: zodResolver(zodSchema),
  });
  const { resetDateTime, time, startDate } = CalendarModel.useCalendarStore();
  const { filter: typeFilter, clearFilter: clearType } =
    CertificationModel.useCertificationStore();
  const { filter: departmentFilter, clearFilter: clearDepartment } =
    DepartmentsModel.useDepartmentsStore();

  const { isLoading: isPending, mutate } = useMutation({
    mutationKey: [CertApi.QueryReqName.createCert],
    mutationFn: CertApi.createCert,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ICert> = (vals: unknown) => {
    const mutationValues = vals as CertCreationDto;
    const dateTime = time.split(":");
    const date = new Date(startDate);
    const dateWithTime = new Date(
      date.setHours(+dateTime[0], +dateTime[1]) - 60 * 60 * 1000
    );

    mutationValues["date"] = dateWithTime.toJSON();
    mutationValues["type"] = typeFilter.id;
    mutationValues["department"] = departmentFilter.id;

    mutate(mutationValues, {
      onSuccess: () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
        resetDateTime();
        clearType();
        clearDepartment();
        reset({
          contact_name: "",
          phone: "",
          email: "",
          date: "",
        });
      },
    });
  };

  return (
    <>
      <Form submitFn={handleSubmit(onSubmit)}>
        <CertificationDropdown />
        <FormControl
          field={"contact_name" as FieldsKey}
          rules={{ required: true }}
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
            rules={{ required: true }}
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
            rules={{ required: true }}
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
            <input type="checkbox" />
            &nbsp;Нажимая кнопку "Зарегистрироваться", Вы даёте свое &nbsp;
            <AssentA href="https://nastavnikprof.donstu.ru/personal.html?from=autorization&type=register">
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
      </Form>
      <Modal isOpen={isOpen} />
    </>
  );
};

export default Certificates;

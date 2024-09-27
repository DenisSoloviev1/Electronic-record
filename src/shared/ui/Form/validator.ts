import { validator } from "@/shared/lib";

// Поля формы
export enum FieldsKey {
  contact_name = "contact_name",
  email = "email",
  phone = "phone",
  date = "date",
}

// Сообщения об ошибках для обязательных полей
enum FieldRequiredWarnings {
  contact_name = "Введите фамилию и имя",
  email = "Введите email",
  phone = "Введите номер телефона",
  date = "Введите дату",
}

// Получение сообщения об обязательном поле
const getRequiredError = (val: FieldsKey) => ({
  required_error:
    FieldRequiredWarnings[val as keyof typeof FieldRequiredWarnings],
});

// Валидация текстовых полей (например, для фамилии и имени)
const validateText = (val: FieldsKey) =>
  validator.string(getRequiredError(val)).trim();

// Валидация номера телефона
const validatePhone = (val: FieldsKey) =>
  validator
    .string(getRequiredError(val))
    .regex(/^(\+7|8|9)\d{9,10}$/, {
      message: "Неверный формат",
    })
    .min(10, { message: "Номер телефона слишком короткий" })
    .max(12, { message: "Номер телефона слишком длинный" });

// Валидация email
const validateEmail = (val: FieldsKey) =>
  validateText(val).email({
    message: "Не является e-mail",
  });

// Валидация даты в формате дд.мм.гггг
// const validateDate = (val: FieldsKey) =>
//   validator
//     .string(getRequiredError(val))
//     .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
//       message: "Дата должна быть в формате дд.мм.гггг",
//     });

// Создание схемы валидации для полей
export const createSchema = (fields: FieldsKey[]) => {
  const validatorFields = fields.map((field) => {
    switch (field) {
      case "contact_name":
        return { [field]: validateText(field) };
      case "email":
        return { [field]: validateEmail(field) };
      case "phone":
        return { [field]: validatePhone(field) };
      // case "date":
      //   return { [field]: validateDate(field) };
      default:
        break;
    }
  });

  return validator.object(Object.assign({}, ...validatorFields));
};

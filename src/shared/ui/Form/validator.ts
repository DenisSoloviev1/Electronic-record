import { validator } from '@/shared/lib';

export enum FieldsKey {
  contact_name = 'contact_name',
  email = 'email',
  phone = 'phone',
  // date = 'date',
}

enum FieldRequiredWarnings {
  contact_name = 'Введите фамилию и имя',
  email = 'Введите email',
  phone = 'Введите номер телефона',
  // date = 'Введите дату'
}

const getRequiredError = (val: FieldsKey) => ({
  required_error:
    FieldRequiredWarnings[val as keyof typeof FieldRequiredWarnings],
});

const validateText = (val: FieldsKey) =>
  validator.string(getRequiredError(val)).trim();

const validatePhone = (val: FieldsKey) => validator.string(getRequiredError(val)).min(10).max(12);

const validateEmail = (val: FieldsKey) =>
  validateText(val).email({
    message: 'Не является e-mail',
  });


export const createSchema = (fields: FieldsKey[]) => {
  const validatorFields = fields.map((field) => {
    switch (field) {
      case 'contact_name':
        return { [field]: validateText(field) };
      case 'email':
        return { [field]: validateEmail(field) };
      case 'phone':
        return { [field]: validatePhone(field) };
      default:
        break;
    }
  });

  return validator.object(Object.assign({}, ...validatorFields));
};

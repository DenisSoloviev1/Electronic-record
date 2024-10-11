type mainT = {
  [key: string]: string;
};

export const mainTitle: mainT = {
"/employee": "Работник",
"/student": "Студент",
"/applicant": "Соискатель",

  // пока нахуй не надо
  // "/transfer": "Перевод",
  // "/dismissal": "Увольнение",
  // "/vacation": "Отпуск",
  // "/consultations": "Консультации",
  // "/employment-contract": "Продление трудового договора",
  // "/internal-admission": "Прием по внутреннему совметистельству",
};

export enum Routes {
  MAIN = "/main",
  EMPLOYEE = "/employee",
  STUDENT = "/student",
  APPLICANT = "/applicant",


  // пока нахуй не надо
  // TRANSFER = "/transfer",
  // DISTRICT = "/dismissal",
  // VACATION = "/vacation",
  // CONSULTATION = "/consultations",
  // EMPLOYMENT_CONTRACT = "/employment-contract",
  // INTERNAL_ADMISSION = "/internal-admission",
  // REQUESTS = "/requests",
}

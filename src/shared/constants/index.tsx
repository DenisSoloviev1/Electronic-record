type mainT = {
  [key: string]: string;
};

export const mainTitle: mainT = {
  "/personnel-department": "Отдел кадров",


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
  PERSONNEL_DEPARTMENT = "/personnel-department",


  // пока нахуй не надо
  // TRANSFER = "/transfer",
  // DISTRICT = "/dismissal",
  // VACATION = "/vacation",
  // CONSULTATION = "/consultations",
  // EMPLOYMENT_CONTRACT = "/employment-contract",
  // INTERNAL_ADMISSION = "/internal-admission",
  // REQUESTS = "/requests",
}

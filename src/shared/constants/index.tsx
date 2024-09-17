type mainT = {
  [key: string]: string;
};

export const mainTitle: mainT = {
  '/certificates': 'Справки',
  '/transfer': 'Перевод',
  '/dismissal': 'Увольнение',
  '/vacation': 'Отпуск',
  '/consultations': 'Консультации',
  '/employment-contract': 'Продление трудового договора',
  '/internal-admission': 'Прием по внутреннему совметистельству',
};

export enum Routes {
  MAIN = '/main',
  CERTIFICATE = '/certificates',
  TRANSFER = '/transfer',
  DISTRICT = '/dismissal',
  VACATION = '/vacation',
  CONSULTATION = '/consultations',
  EMPLOYMENT_CONTRACT = '/employment-contract',
  INTERNAL_ADMISSION = '/internal-admission',
  REQUESTS = '/requests',
}

import { Routes } from '@/shared/constants';

type Menu = {
  id: number;
  path: Routes;
  label: string;
};

export const menuItems: Menu[] = [
  {
    id: 1,
    path: Routes.CERTIFICATE,
    label: 'Справки',
  },
  {
    id: 2,
    path: Routes.TRANSFER,
    label: 'Перевод',
  },
  {
    id: 3,
    path: Routes.DISTRICT,
    label: 'Увольнение',
  },
  {
    id: 4,
    path: Routes.VACATION,
    label: 'Отпуск',
  },
  {
    id: 5,
    path: Routes.CONSULTATION,
    label: 'Консультации',
  },
  {
    id: 6,
    path: Routes.EMPLOYMENT_CONTRACT,
    label: 'Продление трудового договора',
  },
  {
    id: 7,
    path: Routes.INTERNAL_ADMISSION,
    label: 'Прием по внутреннему совметистельству',
  },
];

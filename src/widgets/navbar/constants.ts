import { Routes } from '@/shared/constants';

export interface Menu {
  id: number;
  path: string;
  label: string;
  allowedRoles: string[]; 
}

export const menuItems: Menu[] = [
  {
    id: 1,
    path: Routes.EMPLOYEE,
    label: 'Отдел кадров',
    allowedRoles: ['EMPLOYEE']
  },
  {
    id: 2,
    path: Routes.STUDENT,
    label: 'Отдел по работе с обучающимися',
    allowedRoles: ['STUDENT'] 
  },
  {
    id: 3,
    path: Routes.APPLICANT,
    label: 'Управление кадров',
    allowedRoles: ['APPLICANT']
  },
];

import { LazyExoticComponent, ReactNode } from 'react';

type ValueOf<T> = T[keyof T];

// roles

export const RolesDict = {
  EMPLOYEE: 'Работник',
  STUDENT: 'Студент',
  APPLICANT: 'Соискатель',
} as const;

export type Roles = ValueOf<typeof RolesDict>;

// router types

export interface IRoute {
  id: number;
  path: string;
  isPublic: boolean;
  component: LazyExoticComponent<() => ReactNode>;
  roles: Roles[];
  withLayout: boolean;
}

// departments

export interface IDepartment {
  id: number;
  name: string;
  executor: number;
}

// certificatioin

export interface ICert {
  contact_name: string;
  email: string;
  phone: string;
  date: Date | string;
  division: number;
  typeOfRequest: number;
  type: number;
}

export interface CertType {
  id: number;
  name: string;
}

// calendar

export interface ICalendar {
  month: Date | string;
  day: Date | string;
  time: Date | string;
}

import { lazy } from "react";
import { Routes } from "@/shared/constants";
import { IRoute, RolesDict } from "@/shared/types";

export const routes: IRoute[] = [
  {
    id: 0,
    path: "/",
    component: lazy(() => import("../ui/auth")),
    isPublic: true,
    roles: [RolesDict.APPLICANT, RolesDict.EMPLOYEE, RolesDict.STUDENT],
    withLayout: false,
  },
  {
    id: 1,
    path: Routes.LOGIN,
    component: lazy(() => import("../ui/login")),
    isPublic: false,
    roles: [RolesDict.EMPLOYEE, RolesDict.STUDENT],
    withLayout: false,
  },
  {
    id: 2,
    path: Routes.MAIN,
    component: lazy(() => import("../ui/main")),
    isPublic: false,
    roles: [RolesDict.APPLICANT, RolesDict.EMPLOYEE, RolesDict.STUDENT],
    withLayout: true,
  },
  {
    id: 3,
    path: Routes.EMPLOYEE,
    component: lazy(() => import("../ui/employee")),
    isPublic: false,
    roles: [RolesDict.EMPLOYEE],
    withLayout: true,
  },
  {
    id: 4,
    path: Routes.STUDENT,
    component: lazy(() => import("../ui/student")),
    isPublic: false,
    roles: [RolesDict.STUDENT],
    withLayout: true,
  },
  {
    id: 5,
    path: Routes.APPLICANT,
    component: lazy(() => import("../ui/applicant")),
    isPublic: false,
    roles: [RolesDict.APPLICANT],
    withLayout: true,
  },
];

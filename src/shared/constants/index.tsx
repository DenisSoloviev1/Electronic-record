type mainT = {
  [key: string]: string;
};

export const mainTitle: mainT = {
"/employee": "Работник",
"/student": "Студент",
"/applicant": "Соискатель",
};

export enum Routes {
  MAIN = "/main",
  EMPLOYEE = "/employee",
  STUDENT = "/student",
  APPLICANT = "/applicant",
  LOGIN = "/login",
  CALLBACK = "/callback",
}

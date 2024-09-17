import { PaginatedTypeOfRequestReadList, TypeOfRequestRead } from '@/oapi/main';

export type RequestsListDTO = Partial<TypeOfRequestRead>;
export type RequestsDTO = PaginatedTypeOfRequestReadList;

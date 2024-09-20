import { QueryFunction } from 'react-query';
import { TypeOfRequestsDto } from '@/entities/departments/model/types.ts';
import { api, checkStatus } from '@/shared/config';

export enum QueryReqName {
  getTypeOfRequest = 'type-of-request',
}

type GetTypeOfRequestsParams = {
  limit?: number;
  offset?: number;
  search?: string;
};

type GetDepartmentsQueryKey = [
  QueryReqName.getTypeOfRequest,
  GetTypeOfRequestsParams,
];

export const getDepartments: QueryFunction<
TypeOfRequestsDto,
  GetDepartmentsQueryKey
> = async ({ queryKey }) => {
  const { limit, offset, search } = queryKey[1];
  try {
    const res = await api.departmentsApi.departmentsList(limit, offset, search);

    if (checkStatus(res.status)) {
      return res.data as TypeOfRequestsDto;
    }

    return {};
  } catch (err) {
    console.log(err);

    return {};
  }
};

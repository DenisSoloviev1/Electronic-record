import { QueryFunction } from 'react-query';
import { DepatmentsDto } from '@/entities/departments/model/types.ts';
import { api, checkStatus } from '@/shared/config';

export enum QueryReqName {
  getDepartments = 'departments',
}

type GetDepartmentsParams = {
  limit?: number;
  offset?: number;
  search?: string;
};

type GetDepartmentsQueryKey = [
  QueryReqName.getDepartments,
  GetDepartmentsParams,
];

export const getDepartments: QueryFunction<
  DepatmentsDto,
  GetDepartmentsQueryKey
> = async ({ queryKey }) => {
  const { limit, offset, search } = queryKey[1];
  try {
    const res = await api.departmentsApi.departmentsList(limit, offset, search);

    if (checkStatus(res.status)) {
      return res.data as DepatmentsDto;
    }

    return {};
  } catch (err) {
    console.log(err);

    return {};
  }
};

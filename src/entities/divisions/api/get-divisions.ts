import { QueryFunction } from 'react-query';
import { DivisionsDto } from '@/entities/divisions/model/types.ts';
import { api, checkStatus } from '@/shared/config';

export enum QueryReqName {
  getDivisions = 'divisions',
}

type GetDivisionsParams = {
  limit?: number;
  offset?: number;
  search?: string;
  role: string;
  authToken: string;
};

type GetDivisionsQueryKey = [
  QueryReqName.getDivisions,
  GetDivisionsParams,
];

export const getDivisions: QueryFunction<
  DivisionsDto,
  GetDivisionsQueryKey
> = async ({ queryKey }) => {
  const { limit, offset, search, role, authToken } = queryKey[1];
  try {
    const res = await api.divisionsApi.divisionsList(limit, offset, search, role, authToken);

    if (checkStatus(res.status)) {
      return res.data as DivisionsDto;
    }

    return {};
  } catch (err) {
    console.log(err);

    return {};
  }
};

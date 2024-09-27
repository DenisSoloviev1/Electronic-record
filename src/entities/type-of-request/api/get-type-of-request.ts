import { QueryFunction } from 'react-query';
import { TypeOfRequestsDto } from '@/entities/type-of-request/model/types.ts';
import { api, checkStatus } from '@/shared/config';

export enum QueryReqName {
  getTypeOfRequest = 'type-of-request',
}

type GetTypeOfRequestsParams = {
  limit?: number;
  offset?: number;
  search?: string;
};

type GetTypeOfRequestsQueryKey = [
  QueryReqName.getTypeOfRequest,
  GetTypeOfRequestsParams,
];

export const getTypeOfRequests: QueryFunction<
TypeOfRequestsDto,
  GetTypeOfRequestsQueryKey
> = async ({ queryKey }) => {
  const { limit, offset, search } = queryKey[1];
  try {
    const res = await api.typesOfRequestsApi.typesOfRequestsList(limit, offset, search);

    if (checkStatus(res.status)) {
      return res.data as TypeOfRequestsDto;
    }

    return {};
  } catch (err) {
    console.log(err);

    return {};
  }
};

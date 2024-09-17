import { QueryFunction } from 'react-query';
import { api } from '@/shared/config';
import { RequestsDTO } from '../model/types';

export enum QueryReqName {
  getRequestsList = 'request-types-list',
}

interface GetRequestsListParams {
  limit?: number;
  offset?: number;
  search?: string;
  roles?: string;
}

type GetRequestTypesListQueryKey = [
  'request-types-list',
  GetRequestsListParams,
];

export const getRequestTypesList: QueryFunction<
  RequestsDTO,
  GetRequestTypesListQueryKey
> = async ({ queryKey }) => {
  const { roles, limit, offset, search } = queryKey[1];

  try {
    const { data } = await api.typesOfRequests.typesOfRequestsList(
      limit,
      offset,
      search,
      {
        params: { roles },
      },
    );

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
};

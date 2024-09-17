import { api, checkStatus } from '@/shared/config';
import { RequestCreate } from '@/oapi/main';

export enum QueryReqName {
  checkTimeApi = 'check-time-api',
}

export const checkTimeApi = async () => {
  try {
    const res = await api.requestsApi.requestsBusyRetrieve();

    if (checkStatus(res.status)) {
      return res.data as RequestCreate;
    }

    return null;
  } catch {
    return null;
  }
};

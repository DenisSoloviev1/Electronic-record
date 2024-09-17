import { api, checkStatus } from '@/shared/config';
import { CertCreationDto } from '../model/types';

export enum QueryReqName {
  createCert = 'cert',
}

export const createCert: (
  params: CertCreationDto,
) => Promise<CertCreationDto | null> = async (params) => {
  try {
    const res = await api.requestsApi.requestsCreate(params);
    if (checkStatus(res.status)) {
      return res.data as CertCreationDto;
    }

    return null;
  } catch (err) {
    console.log(err);

    return null;
  }
};

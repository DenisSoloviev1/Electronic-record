import { useQuery } from 'react-query';
import { api } from '@/shared/config';
import { CertType } from '@/shared/types';

const getCertTypesApi = async (): Promise<CertType[] | null> => {
  try {
    const { data } = await api.get<CertType[]>('types/');

    return data;
  } catch {
    return null;
  }
};

export const useGetCertTypes = () =>
  useQuery({
    queryKey: ['cert-type'],
    queryFn: getCertTypesApi,
    retry: 3,
  });

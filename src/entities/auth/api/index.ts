// import { QueryFunction } from 'react-query';
// import { api, checkStatus } from '@/shared/config';
// import { AuthDto } from '../model/types';

// export enum QueryReqName {
//   authByDSTU = 'auth',
// }

// type AuthByDSTUResponse = AuthDto;
// type AuthByDSTUQueryKey = ['auth', AuthDto];

// export const authByDSTU: QueryFunction<
//   AuthByDSTUResponse,
//   AuthByDSTUQueryKey
// > = async ({ queryKey }) => {
//   const { code } = queryKey[1];

//   try {
//     const res = await api.authApi.authCreate({ code });

//     if (checkStatus(res.status)) {
//       return res.data;
//     }

//     return {
//       code: '',
//     };
//   } catch (e) {
//     console.log(e);

//     return { code: '' };
//   }
// };

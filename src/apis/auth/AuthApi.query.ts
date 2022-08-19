import { useQuery } from 'react-query';

import { QueryHookParams } from '@apis/type';

import authApi from './AuthApi';

// import authController from './AuthApi.controller';

export const AUTH_API_QUERY_KEY = {
  REFRESH_TOKEN: () => ['refresh-token'],
  ACCESS_TOKEN: () => ['access-token'],
  CHECK_USER_REGISTRATION_BY_ADDRESS: (address: string | null) => [
    'user-registration',
    address,
  ],
};
// EXAMPLE
// export function useRefreshTokenQuery(
//   params?: QueryHookParams<typeof authController.refreshToken>,
// ) {
//   const queryKey = AUTH_API_QUERY_KEY.REFRESH_TOKEN();
//   const query = useQuery(
//     queryKey,
//     () => authController.refreshToken(),
//     params?.options,
//   );
//   return { ...query, queryKey };
// }

export function useAccessTokenQuery(
  params?: QueryHookParams<typeof authApi.getAccessToken>,
) {
  const queryKey = AUTH_API_QUERY_KEY.ACCESS_TOKEN();
  const query = useQuery(
    queryKey,
    () => authApi.getAccessToken(),
    params?.options,
  );
  return { ...query, queryKey };
}

export function useCheckUserRegistration(
  params: QueryHookParams<typeof authApi.checkUserRegistration>,
) {
  const queryKey = AUTH_API_QUERY_KEY.CHECK_USER_REGISTRATION_BY_ADDRESS(
    params.variables,
  );
  const query = useQuery(
    queryKey,
    () => authApi.checkUserRegistration(params.variables),
    params?.options,
  );
  return { ...query, queryKey };
}

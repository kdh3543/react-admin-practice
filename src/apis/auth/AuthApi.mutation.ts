import { useMutation } from 'react-query';

import { MutationHookParams } from '@apis/type';

import authApi from './AuthApi';

export const AUTH_API_QUERY_KEY = {};

export function useRequestSignUp(
  params?: MutationHookParams<typeof authApi.requestSignUp>,
) {
  return useMutation(authApi.requestSignUp, {
    ...params?.options,
  });
}

export function useVerifySignUp(
  params?: MutationHookParams<typeof authApi.verifySignUp>,
) {
  return useMutation(authApi.verifySignUp, {
    ...params?.options,
  });
}

export function useRequestLogIn(
  params?: MutationHookParams<typeof authApi.requestLogIn>,
) {
  return useMutation(authApi.requestLogIn, {
    ...params?.options,
  });
}

export function useVerifyLogIn(
  params?: MutationHookParams<typeof authApi.verifyLogIn>,
) {
  return useMutation(authApi.verifyLogIn, {
    ...params?.options,
  });
}

export function useLogOut(params?: MutationHookParams<typeof authApi.logOut>) {
  return useMutation(authApi.logOut, {
    ...params?.options,
  });
}

export function useCheckUserRegistration(
  params?: MutationHookParams<typeof authApi.checkUserRegistration>,
) {
  return useMutation(authApi.checkUserRegistration, {
    ...params?.options,
  });
}

import { useMutation } from 'react-query';

import { MutationHookParams } from '@apis/type';

import connectApi from './ConnectApi';
import { ConnectDTOType } from './ConnectApi.type';

export const CONNECT_API_MUTATION_KEY = {
  POST: (param?: ConnectDTOType) => ['connect-post', param],
};

export const usePostConnectAuthenticationMutation = (
  params?: MutationHookParams<typeof connectApi.postConnectAuthentication>,
) => {
  return useMutation(connectApi.postConnectAuthentication, {
    ...params?.options,
  });
};
// export const usePostInternalConnectMutation = (
//   params?: MutationHookParams<typeof connectApi.postInternalConnect>,
// ) => {
//   return useMutation(connectApi.postInternalConnect, {
//     ...params?.options,
//   });
// };
// export const usePostInternalDisconnectMutation = (
//   params?: MutationHookParams<typeof connectApi.postInternalDisconnect>,
// ) => {
//   return useMutation(connectApi.postInternalDisconnect, {
//     ...params?.options,
//   });
// };

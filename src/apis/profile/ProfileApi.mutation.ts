import { useMutation } from 'react-query';

import { MutationHookParams } from '@apis/type';

import profileApi from './ProfileApi';

export function useUpdateProfile(
  params?: MutationHookParams<typeof profileApi.updateProfile>,
) {
  return useMutation(profileApi.updateProfile, {
    ...params?.options,
  });
}

export function useUploadProfileImage(
  params?: MutationHookParams<typeof profileApi.uploadProfileImage>,
) {
  return useMutation(profileApi.uploadProfileImage, {
    ...params?.options,
  });
}

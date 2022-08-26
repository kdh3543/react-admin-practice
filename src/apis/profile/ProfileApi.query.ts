import { useQuery } from 'react-query';

import { QueryHookParams } from '../type';

import profileApi from './ProfileApi';

export const PROFILE_API_QUERY_KEY = {
  GET_PROFILE: () => ['get-profile'],
};

export function useGetProfileQuery(
  params?: QueryHookParams<typeof profileApi.getProfile>,
) {
  const queryKey = PROFILE_API_QUERY_KEY.GET_PROFILE();
  const query = useQuery(
    queryKey,
    () => profileApi.getProfile(),
    params?.options,
  );
  return { ...query, queryKey };
}

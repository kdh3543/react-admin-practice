import { useQuery } from 'react-query';

import { QueryHookParams } from '@apis/type';

import inventoryApi from './InventoryApi';

export const INVENTORY_API_QUERY_KEY = {
  GET_BY_ID: (id?: string) => ['inventory-by-id', id],
};

export function useGetInventoryByCategoryIdQuery(
  params: QueryHookParams<typeof inventoryApi.getInventoryByCateogryId>,
) {
  const queryKey = INVENTORY_API_QUERY_KEY.GET_BY_ID(params?.variables);
  const query = useQuery(
    queryKey,
    () => inventoryApi.getInventoryByCateogryId(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

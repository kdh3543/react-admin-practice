import { useMutation } from 'react-query';

import { MutationHookParams } from '@apis/type';

import inventoryApi from './InventoryApi';
import {
  InventoryDTOType,
  InventoryParamPatchType,
  InventoryParamPutType,
} from './InventoryApi.type';

export const INVENTORY_API_MUTATION_KEY = {
  POST: (param?: InventoryDTOType) => ['inventory-post', param],
  PUT: (req?: InventoryParamPutType) => ['inventory-put', req],
  PATCH: (req?: InventoryParamPatchType) => ['inventory-patch', req],
  DELETE: (id?: string) => ['inventory-delete', id],
};

// export const usePostInventoryMutation = (
//   params?: MutationHookParams<typeof inventoryApi.postInventory>,
// ) => {
//   return useMutation(inventoryApi.postInventory, {
//     ...params?.options,
//   });
// };

// export const usePutInventoryMutation = (
//   params?: MutationHookParams<typeof inventoryApi.putInventory>,
// ) => {
//   return useMutation(inventoryApi.putInventory, {
//     ...params?.options,
//   });
// };
// export const usePatchInventoryMutation = (
//   params?: MutationHookParams<typeof inventoryApi.patchInventory>,
// ) => {
//   return useMutation(inventoryApi.patchInventory, {
//     ...params?.options,
//   });
// };
// export const useDeleteInventoryMutation = (
//   params?: MutationHookParams<typeof inventoryApi.deleteInventory>,
// ) => {
//   return useMutation(inventoryApi.deleteInventory, {
//     ...params?.options,
//   });
// };

import { AccessTokenType } from '@apis/auth/AuthApi.type';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const ADDR_KEY = '@address';

export const getAddress = () => {
  const token = getLocalStorage<string>(ADDR_KEY);
  return token;
};

export const setAddress = (addr: string) => {
  setLocalStorage(ADDR_KEY, addr);
};

export const deleteAddress = () => {
  removeLocalStorage(ADDR_KEY);
};

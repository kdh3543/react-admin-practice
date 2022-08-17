import { AccessTokenType } from '@apis/auth/AuthApi.type';

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

const TOKEN_KEY = '@token';

export const getToken = () => {
  const token = getLocalStorage<AccessTokenType>(TOKEN_KEY, {
    accessToken: null,
  });
  return token;
};

export const setToken = (token: AccessTokenType) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};

import axios from 'axios';

import { CONFIG } from '@config';
import { apiLogger } from '@utils/apiLogger';
import { getCookie } from '@utils/cookie';
import { getToken, setToken } from '@utils/localStorage/token';
import styledConsole from '@utils/styledConsole';

// import authController from '@apis/auth/AuthApi.controller';
// import authController from '../auth/AuthApi.controller';

const refreshToken = async () => {
  const token = getCookie('RefreshToken');
  if (!token) throw Error('Not found refresh-token');
  try {
    const refreshed = await axios({
      method: 'GET',
      url: `${CONFIG.API_BASE_URL}/auth/refresh`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setToken(refreshed.data);
    return refreshed;
  } catch (err) {
    throw new Error('refresh-error');
  }
};

const isDev = CONFIG.ENV === 'development';

const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const unsetAuthHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    const isAccess = !!token && !!token.accessToken;
    if (isAccess) setAuthHeader(token.accessToken as string);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error) => {
    try {
      const { response: res, config: reqData } = error || {};
      const { status } = res || {};
      const isUnAuthError = status === 401;
      const isDev = CONFIG.ENV === 'development';

      if (isDev)
        apiLogger({ status, reqData, resData: error, method: 'error' });

      if (isUnAuthError) {
        // const res = await refreshToken();
        // if (res?.data?.accessToken) {
        //   setAuthHeader(res?.data?.accessToken);
        //   return instance(reqData);
        // }
      }

      return Promise.reject(error);
    } catch (e) {
      styledConsole({
        //
        method: 'error',
        topic: 'UN_HANDLED',
        title: 'axios-interceptor',
        data: e,
      });
    }
  },
);

export { setAuthHeader, unsetAuthHeader };
export default instance;

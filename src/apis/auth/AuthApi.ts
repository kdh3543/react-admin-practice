import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import {
  GetAccessTokenReturnType,
  RequestLogInParams,
  RequestReturnType,
  RequestSignUpParams,
  UserRegistrationReturnType,
  VerifyLogInParams,
  VerifyLogInReturnType,
  VerifySignUpParams,
  VerifySignUpReturnType,
} from './AuthApi.type';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  // [GET] 가입 유무 확인
  checkUserRegistration = async (
    address: string | null,
  ): Promise<UserRegistrationReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/auth/user/${address}`,
    });
    return data;
  };
  // [POST] wallet 회원가입 요청
  requestSignUp = async (
    params: RequestSignUpParams,
  ): Promise<RequestReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/auth/signup/request`,
      data: params,
    });
    return data;
  };
  // [POST] wallet 회원가입
  verifySignUp = async (
    params: VerifySignUpParams,
  ): Promise<VerifySignUpReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/auth/signup/verify`,
      data: params,
    });
    return data;
  };
  // [POST] wallet 로그인 요청
  requestLogIn = async (
    params: RequestLogInParams,
  ): Promise<RequestReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/auth/login/request',
      headers: {
        Authorization: `Basic ${btoa(`${params.address}: `)}`,
      },
    });
    return data;
  };
  // [POST] wallet 로그인 인증
  verifyLogIn = async (
    params: VerifyLogInParams,
  ): Promise<VerifyLogInReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/auth/login/verify',
      headers: {
        Authorization: `Basic ${btoa(`${params.address}:${params.signature}`)}`,
      },
      data: { challenge: params.challenge },
    });
    return data;
  };
  // [POST] logout
  logOut = async (): Promise<unknown> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/auth/logout',
      headers: {
        Authorization: `Bearer ${getToken().accessToken}`,
      },
    });
    return data;
  };
  // [GET] access token
  getAccessToken = async (): Promise<GetAccessTokenReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/auth/refresh`,
    });
    return data;
  };
}

const authApi = new AuthApi();

export default authApi;

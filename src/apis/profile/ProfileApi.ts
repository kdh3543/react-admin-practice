import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';
import { getToken } from '../../localStorage/token';

import {
  ProfileReturnType,
  UpdateProfileParams,
  UpdateProfileReturnType,
  UploadProfileImageParmas,
  UploadProfileImageReturnType,
} from './ProfileApi.type';

export class ProfileApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  // [GET] profile
  getProfile = async (): Promise<ProfileReturnType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/profile`,
      headers: {
        Authorization: `Bearer ${getToken().accessToken}`,
      },
    });
    return data;
  };
  // [POST] update profile
  updateProfile = async (
    params: UpdateProfileParams,
  ): Promise<UpdateProfileReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/profile`,
      headers: {
        Authorization: `Bearer ${getToken().accessToken}`,
      },
      data: params,
    });
    return data;
  };
  // [POST] update profile image
  uploadProfileImage = async (
    params: UploadProfileImageParmas,
  ): Promise<UploadProfileImageReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/profile/upload`,
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=----WebKitFormBoundaryCCvKw1sVL4JoHo5l',
        Authorization: `Bearer ${getToken().accessToken}`,
      },
      data: params,
    });
    return data;
  };
}

const profileApi = new ProfileApi();

export default profileApi;

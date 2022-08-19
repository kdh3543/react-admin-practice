import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import {
  ConnectDTOType,
  ConnectReturnType,
  InternalConnectDTOType,
  InternalConnectReturnType,
  InternalDisconnectDTOType,
  InternalDisconnectReturnType,
} from './ConnectApi.type';

export class ConnectApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  postConnectAuthentication = async (
    params: ConnectDTOType,
  ): Promise<ConnectReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/connect/authentication`,
      data: params,
    });
    return data;
  };
  postInternalConnect = async (
    params: InternalConnectDTOType,
  ): Promise<InternalConnectReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/connect/internal/connect`,
      data: params,
    });
    return data;
  };
  postInternalDisconnect = async (
    params: InternalDisconnectDTOType,
  ): Promise<InternalDisconnectReturnType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/connect/internal/disconnect`,
      data: params,
    });
    return data;
  };
}

const connectApi = new ConnectApi();

export default connectApi;

import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { InventoryDTOType } from './InventoryApi.type';

export class InventoryApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getInventoryByCateogryId = async (id: string): Promise<InventoryDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/inventory/category/${id}`,
    });
    return data;
  };
}

const inventoryApi = new InventoryApi();

export default inventoryApi;

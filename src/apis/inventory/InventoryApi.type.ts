export type InventoryDTOType = {
  data: {
    tokens: {
      id: string;
      uri: string;
      balance: string;
    }[];
  };
  code: number;
};
export type InventoryParamGetType = {};
export type InventoryParamPutType = {
  id: string;
  data: InventoryDTOType;
};
export type InventoryParamPatchType = {
  id: string;
  data: Partial<InventoryDTOType>;
};

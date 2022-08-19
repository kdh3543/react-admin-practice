export type ConnectDTOType = {
  account: string;
  type: string;
};

export type ConnectReturnType = {
  code: number;
  data: {
    authentication: string;
  };
  message: string;
};

export type InternalConnectDTOType = {
  account: string;
  authentication: string;
  type: string;
};

export type InternalConnectReturnType = {
  code: number;
  data: {
    address: string;
  };
  message: string;
};

export type InternalDisconnectDTOType = {
  address: string;
  account: string;
  type: string;
};
export type InternalDisconnectReturnType = {
  code: number;
  data: {};
  message: string;
};

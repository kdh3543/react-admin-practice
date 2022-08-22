export type TokenType = NullAble<{
  data: AccessTokenType;
}>;

export type AccessTokenType = NullAble<{
  accessToken: string;
}>;

export type UserRegistrationReturnType = {
  code: number;
  message: string;
  data?: any;
};

export type GetAccessTokenReturnType = {
  code: number;
  data: AccessTokenType;
  message: string;
};

export type RequestSignUpParams = {
  address: string | null;
};

export type RequestReturnType = {
  code: number;
  data: { challenge: string };
  message: string;
};

export type VerifySignUpParams = {
  challenge: string;
  address: string | null;
  signature: string | null;
};

export type VerifySignUpReturnType = {
  code: number;
  data: AccessTokenType;
  message: string;
};

export type RequestLogInParams = {
  address: string | null;
};

export type VerifyLogInParams = {
  address: string | null;
  challenge: string;
  signature: string;
};

export type VerifyLogInReturnType = {
  code: number;
  data: { accessToken: string };
  message: string;
};

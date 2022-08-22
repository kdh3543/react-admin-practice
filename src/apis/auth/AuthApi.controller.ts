import { getToken, setToken } from '@utils/localStorage/token';

import authApi, { AuthApi } from './AuthApi';
import { TokenType } from './AuthApi.type';

export class AuthController {
  constructor(private auth: AuthApi) {
    this.auth = auth;
  }

  refreshToken = async (): Promise<TokenType | void> => {
    const token = getToken();
    if (!token.accessToken) throw Error('Not found refresh-token');
    try {
      const refreshed = await this.auth.getAccessToken();
      setToken(refreshed.data);
      return refreshed;
    } catch (err) {
      throw new Error('refresh-error');
    }
  };
}

const authController = new AuthController(authApi);

export default authController;

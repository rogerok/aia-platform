import { AuthClientType } from '@/lib/auth';
import { AuthByEmailModel } from '@/modules/auth/models/auth';

export class AuthService {
  client: AuthClientType;

  constructor(client: AuthClientType) {
    this.client = client;
  }

  async signInWithEmailAndPassword(credentials: AuthByEmailModel) {
    return await this.client.signIn.email(credentials);
  }
}

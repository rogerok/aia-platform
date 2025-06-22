import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { AuthClientType } from '@/lib/auth';

export class AuthService {
  client: AuthClientType;

  constructor(client: AuthClientType) {
    this.client = client;
  }

  async signInWithEmailAndPassword(credentials: AuthByEmailModel) {
    return await this.client.signIn.email(credentials);
  }
}

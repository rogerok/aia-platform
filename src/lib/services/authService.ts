import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { SignUpModel } from '@/_pages/signUp/models/signUp';
import { AuthClientType, AuthProvidersType } from '@/lib/auth';

export class AuthService {
  client: AuthClientType;

  constructor(client: AuthClientType) {
    this.client = client;
  }

  signInWithEmailAndPassword(credentials: AuthByEmailModel) {
    return this.client.signIn.email(credentials);
  }

  signInBySocial(provider: AuthProvidersType) {
    return this.client.signIn.social({
      provider: provider,
    });
  }

  signUp(data: SignUpModel) {
    return this.client.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }

  signOut() {
    return this.client.signOut();
  }
}

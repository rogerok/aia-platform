import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { SignUpModel } from '@/_pages/signUp/models/signUp';
import { AuthClient, AuthProvidersType } from '@/lib/auth';

export class AuthService {
  client: AuthClient;

  constructor(client: AuthClient) {
    this.client = client;
  }

  signInBySocial(provider: AuthProvidersType) {
    return this.client.instance.signIn.social({
      provider: provider,
    });
  }

  signInWithEmailAndPassword(credentials: AuthByEmailModel) {
    return this.client.instance.signIn.email(credentials);
  }

  signOut() {
    return this.client.instance.signOut();
  }

  signUp(data: SignUpModel) {
    return this.client.instance.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }

  useSession() {
    return this.client.instance.useSession();
  }
}

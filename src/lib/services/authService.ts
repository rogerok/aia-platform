import { AuthByEmailModel } from '@/_pages/signIn/models/auth';
import { SignUpModel } from '@/_pages/signUp/models/signUp';
import { AuthClientType } from '@/lib/auth';

export class AuthService {
  client: AuthClientType;

  constructor(client: AuthClientType) {
    this.client = client;
  }

  signInWithEmailAndPassword(credentials: AuthByEmailModel) {
    return this.client.signIn.email(credentials);
  }

  signUp(data: SignUpModel) {
    return this.client.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }
}

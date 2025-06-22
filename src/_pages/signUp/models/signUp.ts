import { IsEmail, MinLength } from 'class-validator';

export class SignUpModel {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  // @Equals('password')
  confirmPassword: string;
}

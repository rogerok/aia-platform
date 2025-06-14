import { IsEmail, MinLength } from 'class-validator';

export class AuthModel {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

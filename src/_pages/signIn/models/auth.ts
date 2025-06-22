import { IsEmail, MinLength } from 'class-validator';

export class AuthByEmailModel {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

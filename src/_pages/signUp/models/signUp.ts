import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class SignUpModel {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @Length(8, 50)
  password: string;

  @ValidateIf((o) => o.password !== o.passwordConfirm)
  @IsNotEmpty()
  @IsEmpty({ message: 'password confirm must match password' })
  @Length(8, 50)
  passwordConfirm: string;
}

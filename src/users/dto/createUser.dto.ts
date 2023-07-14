import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

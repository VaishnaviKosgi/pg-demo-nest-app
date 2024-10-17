import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsEnum(Role)
  role: Role;

  @IsArray()
  @ArrayNotEmpty()
  access: string[];
}

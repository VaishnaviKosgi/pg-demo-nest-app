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
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  
  @ApiProperty({ description: 'First name of the user', example: 'Vaishnavi' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'G' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', example: 'vaish.g@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password with at least one uppercase, one lowercase letter, and one number',
    example: 'Password456',
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({ description: 'Mobile number of the user', example: '0123456789' })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ description: 'Country code of the user', example: '+1' })
  @IsString()
  @IsNotEmpty()
  countryCode: string;


  @ApiProperty({
    description: 'Role assigned to the user',
    example: Role.USER,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'Permissions assigned to the user',
    example: ['create', 'read'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  access: string[];
}

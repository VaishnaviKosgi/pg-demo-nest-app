import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
 
  @ApiProperty({ description: 'User email for login', example: 'vaish.g@example.com' })
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'User password for login. Must be a non-empty string.',
    example: 'Password456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

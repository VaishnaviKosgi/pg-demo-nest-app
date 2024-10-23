// src/user/user.controller.ts
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guards';
import { Roles } from '../auth/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.register(registerUserDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.userService.login(loginUserDto);
    return {
      message: 'Login successful',
      token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

 // Admin-only route to get all users
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles(Role.ADMIN)
 @Get('admin/users')
 async getAllUsers() {
   return this.userService.findAllUsers();
 }

 // Route to get a specific user (Admin can see anyone, users can see only their own profile)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles(Role.ADMIN, Role.USER)
 @Get(':userId')
 async getUserById(@Param('userId') userId: string, @Request() req) {
   return this.userService.findUserById(userId, req.user);
 }
}
// src/user/user.controller.ts (Updated)
import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    Request,
  } from '@nestjs/common';
  import { RegisterUserDto } from './dto/register-user.dto';
  import { LoginUserDto } from './dto/login-user.dto';
  import { UserService } from './user.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    /**
     * User Registration Endpoint
     */
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
      const user = await this.userService.register(registerUserDto);
      return {
        message: 'User registered successfully',
        user,
      };
    }
  
    /**
     * User Login Endpoint
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
      const token = await this.userService.login(loginUserDto);
      return {
        message: 'Login successful',
        token,
      };
    }
  
    /**
     * Example of a protected route
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  
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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({summary: 'Register a new user'})
  @ApiResponse({status: 201, description: 'User Registered successfully'})
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.register(registerUserDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile of the logged-in user' })
  @ApiResponse({ status: 200, description: 'Returns user profile data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    return req.user;
  }

  // Admin-only route to get all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/users')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin-only route to get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  // Route to get a specific user (Admin can see anyone, users can see only their own profile)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID (Admin or self-access)' })
  @ApiResponse({ status: 200, description: 'Returns user data by ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getUserById(@Param('userId') userId: string, @Request() req) {
    return this.userService.findUserById(userId, req.user);
  }
}

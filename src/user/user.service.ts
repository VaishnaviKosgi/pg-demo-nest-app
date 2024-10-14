// src/user/user.service.ts
import {
    Injectable,
    ConflictException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { RegisterUserDto } from './dto/register-user.dto';
  import { LoginUserDto } from './dto/login-user.dto';
  import { User } from './entity/user.entity';
  import { AuthService } from '../auth/auth.service';
  import { HashingService } from '../common/hashing.service'
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private readonly authService: AuthService,
      private readonly hashingService: HashingService,
    ) {}
  
    /**
     * Register a new user
     */
    async register(registerUserDto: RegisterUserDto): Promise<User> {
      const { email, password } = registerUserDto;
  
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
  
      // Hash the password using HashingService
      const hashedPassword = await this.hashingService.hashPassword(password);
  
      // Create new user
      const user = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
      });
  
      return this.userRepository.save(user);
    }
  
    /**
     * User login
     */
    async login(loginUserDto: LoginUserDto): Promise<string> {
      const { email, password } = loginUserDto;
  
      // Find user by email
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Compare passwords using HashingService
      const isPasswordValid = await this.hashingService.comparePasswords(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Generate JWT token using AuthService
      return this.authService.generateToken(user);
    }
  }
  
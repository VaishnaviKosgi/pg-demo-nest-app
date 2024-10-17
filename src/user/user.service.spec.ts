// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { HashingService } from '../common/hashing.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Role } from './enums/role.enum';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;
  let authService: AuthService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        HashingService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    authService = module.get<AuthService>(AuthService);
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123',
        mobile: '1234567890',
        countryCode: '+1',
        role: Role.USER, // Use the Role enum here
        access: ['read'],
      };

      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
      jest
        .spyOn(hashingService, 'hashPassword')
        .mockResolvedValue('hashedPassword');
      jest.spyOn(repo, 'create').mockReturnValue(registerDto as any);
      jest.spyOn(repo, 'save').mockResolvedValue(registerDto as any);

      const result = await service.register(registerDto);
      expect(result).toEqual(registerDto);
    });

    it('should throw conflict exception if email exists', async () => {
      const registerDto = { email: 'john@example.com' } as any;
      jest.spyOn(repo, 'findOne').mockResolvedValue(registerDto);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      const loginDto = { email: 'john@example.com', password: 'Password123' };
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'USER',
      } as any;

      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      jest.spyOn(hashingService, 'comparePasswords').mockResolvedValue(true);
      jest.spyOn(authService, 'generateToken').mockReturnValue('jwtToken');

      const result = await service.login(loginDto);
      expect(result).toBe('jwtToken');
    });

    it('should throw unauthorized exception if user not found', async () => {
      const loginDto = { email: 'john@example.com', password: 'Password123' };
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw unauthorized exception if password invalid', async () => {
      const loginDto = { email: 'john@example.com', password: 'WrongPassword' };
      const user = { password: 'hashedPassword' } as any;

      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      jest.spyOn(hashingService, 'comparePasswords').mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

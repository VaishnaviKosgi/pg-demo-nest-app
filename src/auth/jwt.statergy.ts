// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Tokens will expire
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your_jwt_secret_key',
    });
  }

  async validate(payload: any) {
    // You can perform additional validation here if needed
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

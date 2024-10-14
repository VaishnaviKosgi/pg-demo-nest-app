// src/common/hashing.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10; // Number of rounds to use for hashing

  /**
   * Hash a plain text password
   * @param password - The plain text password to hash
   * @returns A promise that resolves to the hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds); // Hash the password with the specified rounds
  }

  /**
   * Compare a plain text password with a hashed password
   * @param plainPassword - The plain text password
   * @param hashedPassword - The hashed password to compare against
   * @returns A promise that resolves to a boolean indicating if the passwords match
   */
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword); // Compare the plain and hashed passwords
  }
}

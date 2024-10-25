import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { HashingService } from '../common/hashing.service';
import { Role } from '../user/enums/role.enum';

@Injectable()
export class UserSeeder {
  constructor(
    private readonly connection: Connection,
    private readonly hashingService: HashingService,
  ) {}

  async seed() {
    const userRepository = this.connection.getRepository(User);

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'siri@example.com' },
    });

    if (!existingAdmin) {
      const hashedPassword =
        await this.hashingService.hashPassword('SiriPassword123');

      const admin = userRepository.create({
        firstName: 'Sri',
        lastName: 'Laxmi',
        email: 'siri@example.com',
        password: hashedPassword,
        mobile: '1234545690',
        countryCode: '+222',
        role: Role.ADMIN,
        access: ['create', 'read', 'update', 'delete'],
      });

      await userRepository.save(admin);
      console.log('Admin user created: ', admin);
    } else {
      console.log('Admin user already exists: ', existingAdmin);
    }
  }
}

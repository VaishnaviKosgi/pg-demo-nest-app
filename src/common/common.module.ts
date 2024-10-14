import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Module({
  providers: [HashingService],
  exports: [HashingService], // Export HashingService to make it available in other modules
})
export class CommonModule {}
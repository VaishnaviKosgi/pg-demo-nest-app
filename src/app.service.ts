import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const unusedVar = 'This is not used';
    return 'PG Demo app!';
  }
}

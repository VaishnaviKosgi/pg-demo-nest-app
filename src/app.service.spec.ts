import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });

  it('should return "PG Demo app!"', () => {
    expect(service.getHello()).toBe('PG Demo app!');
  });

  // New Test Cases
  it('should return a string', () => {
    const result = service.getHello();
    expect(typeof result)
    .toBe('string');
  });

  it('should not return an empty string', () => {
    const result = service.getHello();
    expect(result).not.toBe('');
  });
});

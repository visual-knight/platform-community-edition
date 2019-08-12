import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AuthModule]
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

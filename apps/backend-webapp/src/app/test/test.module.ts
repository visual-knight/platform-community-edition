import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { TestService } from './test.service';

@Module({
  providers: [TestResolver, TestService]
})
export class TestModule {}

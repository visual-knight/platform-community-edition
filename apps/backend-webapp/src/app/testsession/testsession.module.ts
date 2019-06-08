import { Module } from '@nestjs/common';
import { TestsessionResolver } from './testsession.resolver';
import { TestsessionService } from './testsession.service';

@Module({
  providers: [TestsessionResolver, TestsessionService]
})
export class TestsessionModule {}

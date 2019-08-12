import { Module } from '@nestjs/common';
import { TestsessionResolver } from './testsession.resolver';
import { TestsessionService } from './testsession.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [TestsessionResolver, TestsessionService]
})
export class TestsessionModule {}

import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { TestService } from './test.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [TestResolver, TestService]
})
export class TestModule {}

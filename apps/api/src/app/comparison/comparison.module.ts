import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ComparisonResolver } from './comparison.resolver';
import { ComparisonService } from './services/comparison.service';

@Module({
  imports: [SharedModule],
  providers: [ComparisonResolver, ComparisonService]
})
export class ComparisonModule {}

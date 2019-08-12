import { Module } from '@nestjs/common';
import { VariationResolver } from './variation.resolver';
import { VariationService } from './variation.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [VariationResolver, VariationService]
})
export class VariationModule {}

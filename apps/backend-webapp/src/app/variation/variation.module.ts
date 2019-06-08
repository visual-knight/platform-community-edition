import { Module } from '@nestjs/common';
import { VariationResolver } from './variation.resolver';
import { VariationService } from './variation.service';

@Module({
  providers: [VariationResolver, VariationService]
})
export class VariationModule {}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { VariationService } from './variation.service';
import { VariationType } from './models/variation';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Int } from 'type-graphql';

@Resolver('Variation')
export class VariationResolver {
  constructor(private variationService: VariationService) {}

  @Query(returns => VariationType)
  @UseGuards(GqlAuthGuard)
  async variation(
    @Args('variationId') variationId: string
  ): Promise<VariationType> {
    return this.variationService.getVariation(variationId);
  }

  @Query(returns => [VariationType])
  @UseGuards(GqlAuthGuard)
  async variations(): Promise<VariationType[]> {
    return this.variationService.getVariations();
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async variationsCount(): Promise<number> {
    return this.variationService.getVariationsCount();
  }

  @Mutation(returns => VariationType)
  @UseGuards(GqlAuthGuard)
  async deleteVariation(
    @Args('variationId') variationId: string
  ): Promise<VariationType> {
    return this.variationService.deleteVariation(variationId);
  }
}

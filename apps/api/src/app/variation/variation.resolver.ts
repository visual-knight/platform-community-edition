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
  async variations(@Args('testId') testId: string): Promise<VariationType[]> {
    return this.variationService.getVariations(testId);
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async variationsCount(@Args('testId') testId: string): Promise<number> {
    return this.variationService.getVariationsCount(testId);
  }

  @Mutation(returns => VariationType)
  @UseGuards(GqlAuthGuard)
  async deleteVariation(
    @Args('variationId') variationId: string
  ): Promise<VariationType> {
    return this.variationService.deleteVariation(variationId);
  }

  @Mutation(returns => VariationType)
  @UseGuards(GqlAuthGuard)
  async acceptNewBaseline(
    @Args('variationId') variationId: string,
    @Args('testSessionId') testSessionId: string,
    @Args({ name: 'comment', nullable: true, type: () => String })
    comment: string
  ): Promise<VariationType> {
    return this.variationService.acceptNewBaseline(
      variationId,
      testSessionId,
      comment
    );
  }
}

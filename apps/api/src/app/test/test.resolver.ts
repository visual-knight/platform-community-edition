import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TestService } from './test.service';
import { TestType } from './models/test';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Int } from 'type-graphql';

@Resolver('Test')
export class TestResolver {
  constructor(private testService: TestService) {}

  @Query(returns => TestType)
  @UseGuards(GqlAuthGuard)
  async test(@Args('testId') testId: string) {
    return this.testService.getTest(testId);
  }

  @Query(returns => [TestType])
  @UseGuards(GqlAuthGuard)
  async tests() {
    return this.testService.getTests();
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async testsCount(): Promise<number> {
    return this.testService.getTestsCount();
  }

  @Mutation(returns => TestType)
  @UseGuards(GqlAuthGuard)
  async deleteTest(@Args('testId') testId: string) {
    return this.testService.deleteTest(testId);
  }
}

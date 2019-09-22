import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TestsessionService } from './testsession.service';
import { TestSessionType } from './models/testsession';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { Int } from 'type-graphql';
import { TestSessionDataArgs } from './models/testsession-where.input';

@Resolver()
export class TestsessionResolver {
  constructor(private testSessionService: TestsessionService) {}

  @Query(returns => TestSessionType)
  @UseGuards(GqlAuthGuard)
  async testSession(
    @Args('testSessionId') testSessionId: string
  ): Promise<TestSessionType> {
    return this.testSessionService.testSession(testSessionId);
  }

  @Query(returns => [TestSessionType])
  @UseGuards(GqlAuthGuard)
  async testSessions(
    @Args({ name: 'where', nullable: true, type: () => TestSessionDataArgs })
    where?: TestSessionDataArgs
  ): Promise<TestSessionType[]> {
    return this.testSessionService.testSessions(where);
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async testSessionsCount(
    @Args({ name: 'where', nullable: true, type: () => TestSessionDataArgs })
    where?: TestSessionDataArgs
  ): Promise<number> {
    return this.testSessionService.testSessionCount(where);
  }

  @Mutation(returns => TestSessionType)
  @UseGuards(GqlAuthGuard)
  async deleteTestSession(
    @Args('testSessionId') testSessionId: string
  ): Promise<TestSessionType> {
    return this.testSessionService.deleteTestSession(testSessionId);
  }

  @Mutation(returns => TestSessionType)
  @UseGuards(GqlAuthGuard)
  async updateTestSession(
    @Args('testSessionId') testSessionId: string,
    @Args('data') data: TestSessionDataArgs
  ): Promise<TestSessionType> {
    return this.testSessionService.updateTestSession(testSessionId, data);
  }
}

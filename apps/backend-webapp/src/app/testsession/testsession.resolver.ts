import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SignedTestSessionUrls } from './models/signed-urls';
import { TestsessionService } from './testsession.service';
import { TestSession } from './models/testsession';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import {
  User as PrismaUser,
  TestSessionUpdateInput
} from '@platform-community-edition/prisma2';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { TestSessionWhereArgs } from './models/testsession-where.input';
import { Int } from 'type-graphql';

@Resolver(of => TestSession)
export class TestsessionResolver {
  constructor(private testSessionService: TestsessionService) {}

  @Query(returns => SignedTestSessionUrls)
  @UseGuards(GqlAuthGuard)
  async getSignedUrls(
    @Args('testSessionId') testSessionId: number,
    @CurrentUser() user: PrismaUser
  ): Promise<SignedTestSessionUrls> {
    return this.testSessionService.getSignedUrls(testSessionId);
  }

  @Query(returns => TestSession)
  @UseGuards(GqlAuthGuard)
  async testSession(
    @Args('testSessionId') testSessionId: number,
    @CurrentUser() user: PrismaUser
  ): Promise<TestSession> {
    return this.testSessionService.testSession(testSessionId, user.id);
  }

  @Query(returns => [TestSession])
  @UseGuards(GqlAuthGuard)
  async testSessions(
    @CurrentUser() user: PrismaUser,
    @Args({ name: 'where', nullable: true, type: () => TestSessionWhereArgs })
    where?: TestSessionWhereArgs
  ): Promise<TestSession[]> {
    return this.testSessionService.testSessions(user.id, where);
  }

  @Query(returns => Int)
  @UseGuards(GqlAuthGuard)
  async testSessionsCount(
    @CurrentUser() user: PrismaUser,
    @Args({ name: 'where', nullable: true, type: () => TestSessionWhereArgs })
    where?: TestSessionWhereArgs
  ): Promise<number> {
    return this.testSessionService.testSessionCount(user.id, where);
  }

  @Mutation(returns => TestSession)
  @UseGuards(GqlAuthGuard)
  async deleteTestSession(
    @CurrentUser() user: PrismaUser,
    @Args('testSessionId') testSessionId: number
  ): Promise<TestSession> {
    return this.testSessionService.deleteTestSession(testSessionId, user.id);
  }

  @Mutation(returns => TestSession)
  @UseGuards(GqlAuthGuard)
  async updateTestSession(
    @CurrentUser() user: PrismaUser,
    @Args('testSessionId') testSessionId: number,
    @Args('data') data: TestSessionUpdateInput
  ): Promise<TestSession> {
    return this.testSessionService.updateTestSession(
      testSessionId,
      user.id,
      data
    );
  }
}

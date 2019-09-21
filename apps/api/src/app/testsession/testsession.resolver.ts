import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TestsessionService } from './testsession.service';
import { TestSessionType } from './models/testsession';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { Int } from 'type-graphql';
import { TestSessionDataArgs } from './models/testsession-where.input';
import { Observable, zip, defer, range, timer } from 'rxjs';
import { map, retryWhen, mergeMap } from 'rxjs/operators';

@Resolver(of => TestSessionType)
export class TestsessionResolver {
  constructor(private testSessionService: TestsessionService) {}

  @Query(returns => TestSessionType)
  @UseGuards(GqlAuthGuard)
  async testSession(
    @Args('testSessionId') testSessionId: string
  ): Promise<TestSessionType> {
    return this.testSessionService.testSession(testSessionId);
  }

  @Query(returns => TestSessionType, { nullable: true })
  @UseGuards(GqlAuthGuard)
  testSessionWatch(
    @Args('testSessionId') testSessionId: string
  ): Observable<TestSessionType> {
    return defer(() => this.testSessionService.testSession(testSessionId)).pipe(
      map(testSession => {
        if (
          ((testSession.misMatchPercentage === null &&
            testSession.variation.baseline !== null) ||
            (testSession.misMatchPercentage === null &&
              testSession.autoBaseline === true)) &&
          testSession.isSameDimensions !== false
        ) {
          console.log('No misMatchPercentage yet');
          throw new Error('No misMatchPercentage yet');
        }
        return testSession;
      }),
      retryWhen(errors =>
        zip(range(1, 100), errors).pipe(mergeMap(i => timer(400)))
      )
    );
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

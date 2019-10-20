import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Observable, zip, defer, range, timer } from 'rxjs';
import { map, retryWhen, mergeMap } from 'rxjs/operators';
import { TestSessionComparison } from './models/testsession-comparison';
import { environment } from '../../environments/environment';
import { ComparisonService } from './services/comparison.service';
import { DesiredCapabilities } from '../shared/services/browser-and-devices';
import { Float } from 'type-graphql';
import { JSONResolver } from 'graphql-scalars';
import { GqlApiGuard } from '../auth/guards/api.guard';

@Resolver()
export class ComparisonResolver {
  constructor(private comparisonService: ComparisonService) {}

  @Query(returns => TestSessionComparison, { nullable: true })
  @UseGuards(GqlApiGuard)
  testSessionWatch(
    @Args('testSessionId') testSessionId: string
  ): Observable<TestSessionComparison> {
    return defer(() => this.comparisonService.testSession(testSessionId)).pipe(
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

        return {
          ...testSession,
          link: `${environment.appDomain}/variation/${testSession.variation.id}`
        };
      }),
      retryWhen(errors =>
        zip(range(1, 100), errors).pipe(mergeMap(i => timer(400)))
      )
    );
  }

  @Mutation(returns => String)
  @UseGuards(GqlApiGuard)
  invokeTestSession(
    @Args('testname') testname: string,
    @Args('project') project: string,
    @Args({ name: 'misMatchTolerance', type: () => Float })
    misMatchTolerance: number,
    @Args({ name: 'capabilities', type: () => JSONResolver })
    capabilities: DesiredCapabilities,
    @Args('autoBaseline') autoBaseline: boolean
  ) {
    console.log('invoke GqlApiGuard')
    return this.comparisonService.invokeTestSession(
      testname,
      project,
      misMatchTolerance,
      capabilities,
      autoBaseline
    );
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlApiGuard)
  uploadScreenshot(
    @Args('base64Image') base64Image: string,
    @Args('testSessionId') testSessionId: string
  ) {
    return this.comparisonService.uploadScreenshot(base64Image, testSessionId);
  }
}

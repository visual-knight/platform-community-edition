import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { Observable, zip, defer, range, timer } from 'rxjs';
import { map, retryWhen, mergeMap } from 'rxjs/operators';
import { TestSessionComparison } from './models/testsession-comparison';
import { environment } from '../../environments/environment';
import { ComparisonService } from './services/comparison.service';
import { InvokeTestsession } from './models/invoke-testsession.model';

@Resolver()
export class ComparisonResolver {
  constructor(private comparisonService: ComparisonService) {}

  @Query(returns => TestSessionComparison, { nullable: true })
  @UseGuards(GqlAuthGuard)
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
  @UseGuards(GqlAuthGuard)
  invokeTestSession() {
    return this.comparisonService.getScreenshotUploadUrl();
  }
}

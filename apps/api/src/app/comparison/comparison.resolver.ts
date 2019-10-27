import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Observable, zip, defer, range, timer } from 'rxjs';
import { map, retryWhen, mergeMap, switchMap } from 'rxjs/operators';
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
    return this.comparisonService.invokeTestSession(
      testname,
      project,
      misMatchTolerance,
      capabilities,
      autoBaseline
    );
  }

  @Mutation(returns => TestSessionComparison, { nullable: true })
  @UseGuards(GqlApiGuard)
  uploadScreenshot(
    @Args('base64Image') base64Image: string,
    @Args('testSessionId') testSessionId: string
  ): Observable<TestSessionComparison> {
    return this.comparisonService
      .uploadScreenshot(base64Image, testSessionId)
      .pipe(
        switchMap(() => {
          console.log('switchmap');
          return this.comparisonService.testSessionWatch(testSessionId);
        })
      );
  }
}

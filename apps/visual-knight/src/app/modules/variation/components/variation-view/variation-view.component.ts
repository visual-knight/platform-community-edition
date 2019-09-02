import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestSessionsDataSource } from './testsessions.datasource';
import { VariationType, TestSessionType, TestType } from '../../../core/types';

@Component({
  selector: 'visual-knight-variation-view',
  templateUrl: './variation-view.component.html',
  styleUrls: ['./variation-view.component.scss']
})
export class VariationViewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  variation$: Observable<VariationType>; // TODO: get current variation
  selectedTestSession$: Observable<TestSessionType>; // TODO: get selected testsession
  testSessions$: Observable<TestSessionType[]>; // TODO: get test sessions
  test$: Observable<TestType>; // TODO: Why do I need it?
  public isDiffView = false;
  public testId: string;
  public testSessionDataSource: TestSessionsDataSource;
  public panelOpenState: boolean;

  private routeParamSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(
      (params: VariationViewParameter) => {
        // TODO: load variation
        this.testId = params.testId;
      }
    );
    this.selectedTestSession$.subscribe(testSession => {
      if (testSession) {
        this.isDiffView = testSession.diffImageKey !== null;
      }
    });
    this.testSessionDataSource = new TestSessionsDataSource(this.testSessions$);
  }

  ngAfterViewInit() {
    this.selectedTestSession$.subscribe(testSession => {
      if (testSession) {
        if (testSession.diffImageKey) {
          setTimeout(() => {});
        }
      }
    });
  }

  isSuccessfull(testSession: TestSessionType) {
    return testSession.misMatchPercentage < testSession.misMatchTolerance;
  }

  onStateChange(
    accept: boolean,
    testSession: TestSessionType,
    variation: VariationType
  ) {
    const comment = null;
    if (accept) {
      this.acceptNewBaseline(testSession, variation, comment);
    } else {
      this.declineTestSession(testSession, comment);
    }
  }

  acceptNewBaseline(
    testSession: TestSessionType,
    variation: VariationType,
    comment: string
  ) {
    // TODO: accept new baseline
  }

  declineTestSession(testSession: TestSessionType, comment: string) {
    // TODO: decline test session
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}

interface VariationViewParameter extends Params {
  testId: string;
  variationId: string;
}

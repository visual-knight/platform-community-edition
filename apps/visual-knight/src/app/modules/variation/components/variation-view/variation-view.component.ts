import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestSession, Variation, Test } from '@generated/photonjs';
import { TestSessionsDataSource } from './testsessions.datasource';

@Component({
  selector: 'visual-knight-variation-view',
  templateUrl: './variation-view.component.html',
  styleUrls: ['./variation-view.component.scss']
})
export class VariationViewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  variation$: Observable<Variation>; // TODO: get current variation
  selectedTestSession$: Observable<TestSession>; // TODO: get selected testsession
  testSessions$: Observable<TestSession[]>; // TODO: get test sessions
  test$: Observable<Test>; // TODO: Why do I need it?
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

  isSuccessfull(testSession: TestSession) {
    return testSession.misMatchPercentage < testSession.misMatchTolerance;
  }

  onStateChange(
    accept: boolean,
    testSession: TestSession,
    variation: Variation
  ) {
    const comment = null;
    if (accept) {
      this.acceptNewBaseline(testSession, variation, comment);
    } else {
      this.declineTestSession(testSession, comment);
    }
  }

  acceptNewBaseline(
    testSession: TestSession,
    variation: Variation,
    comment: string
  ) {
    // TODO: accept new baseline
  }

  declineTestSession(testSession: TestSession, comment: string) {
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

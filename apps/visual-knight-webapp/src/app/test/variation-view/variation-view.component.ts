import { TestSession, TestSessionState } from '../../shared/models/testsession.model';
import { Variation } from '../../shared/models/variation.model';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TestSessionsDataSource } from '../testsessions.datasource';
import { Store, Select } from '@ngxs/store';
import { VariationLoadAction, AcceptNewBaselineAction, DeclineTestSessionAction } from '../state/test.actions';
import { Subscription } from 'rxjs';
import { TestState } from '../state/test.state';
import { Test } from 'src/app/shared/models/test.model';

@Component({
  selector: 'vk-variation-view',
  templateUrl: './variation-view.component.html',
  styleUrls: ['./variation-view.component.scss']
})
export class VariationViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('variationViewDiffImage')
  variationViewDiffImage: ElementRef;
  @ViewChild('variationViewDiffImageContainer')
  variationViewDiffImageContainer: ElementRef;

  @Select(TestState.selectedVaration)
  variation$: Observable<Variation>;
  @Select(TestState.selectedTestSession)
  selectedTestSession$: Observable<TestSession>;
  @Select(TestState.testSessions)
  testSessions$: Observable<TestSession[]>;
  @Select(TestState.selectedTest) test$: Observable<Test>;
  public isDiffView = false;
  public testId: string;
  public testSessionDataSource: TestSessionsDataSource;
  public panelOpenState: boolean;

  private routeParamSub: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe((params: VariationViewParameter) => {
      this.store.dispatch(new VariationLoadAction(params.variationId));
      this.testId = params.testId;
    });
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

  onStateChange(accept: boolean, testSession: TestSession, variation: Variation) {
    const comment = null;
    if (accept) {
      this.acceptNewBaseline(testSession, variation, comment);
    } else {
      this.declineTestSession(testSession, comment);
    }
  }

  acceptNewBaseline(testSession: TestSession, variation: Variation, comment: string) {
    this.store.dispatch(
      new AcceptNewBaselineAction({
        testSessionId: testSession.id,
        variationId: variation.id,
        comment
      })
    );
  }

  declineTestSession(testSession: TestSession, comment: string) {
    this.store.dispatch(new DeclineTestSessionAction({ testSessionId: testSession.id, comment }));
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}

interface VariationViewParameter extends Params {
  testId: string;
  variationId: string;
}

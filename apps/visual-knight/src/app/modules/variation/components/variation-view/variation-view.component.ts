import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestSessionsDataSource } from './testsessions.datasource';
import {
  VariationType,
  TestSessionType,
  TestType,
  VariationDataFragment,
  SelectedTestSessionGQL,
  GetTestNameGQL
} from '../../../core/types';
import { VariationService } from '../../services/variation.service';
import { map, filter, switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-variation-view',
  templateUrl: './variation-view.component.html',
  styleUrls: ['./variation-view.component.scss']
})
export class VariationViewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  variation$: Observable<VariationDataFragment>;
  selectedTestSession$: Observable<TestSessionType>;
  testSessions$: Observable<TestSessionType[]>;
  testName$: Observable<String>;
  public isDiffView = false;
  public testId: string;
  public variationId: string;
  public testSessionDataSource: TestSessionsDataSource;
  public panelOpenState: boolean;

  private routeParamSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private variationService: VariationService,
    private selectedTestSessionGQL: SelectedTestSessionGQL,
    private testGQL: GetTestNameGQL
  ) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(
      (params: VariationViewParameter) => {
        this.testId = params.testId;
        this.variationId = params.variationId;

        this.variation$ = this.variationService
          .variation(params.variationId)
          .pipe(
            filter(({ data }) => !!data),
            map(({ data }) => data.variation)
          );
        this.testSessions$ = this.variation$.pipe(
          map(variation => variation.testSessions)
        );

        this.testName$ = this.testGQL
          .watch({ testId: this.testId })
          .valueChanges.pipe(
            filter(({ loading }) => !loading),
            map(({ data }) => {
              return data.test.name;
            })
          );

        combineLatest(this.variation$, this.route.queryParams)
          .pipe(first())
          .subscribe(([variation, queryParams]) => {
            if (queryParams.testSessionId) {
            }
            this.variationService.setSelectedTestSession(
              queryParams.testSessionId || variation.testSessions[0].id
            );
          });

        this.selectedTestSession$ = this.selectedTestSessionGQL
          .watch()
          .valueChanges.pipe(
            map(({ data }) => data && data.selectedTestSession),
            filter(selected => !!selected),
            switchMap(id =>
              this.testSessions$.pipe(
                map(testSessions =>
                  testSessions.find(testSession => testSession.id === id)
                )
              )
            )
          );
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
    this.variationService.acceptNewBaseline(
      comment,
      testSession.id,
      variation.id
    );
  }

  declineTestSession(testSession: TestSessionType, comment: string) {
    this.variationService.declineTestSession(comment, testSession.id);
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}

interface VariationViewParameter extends Params {
  testId: string;
  variationId: string;
}

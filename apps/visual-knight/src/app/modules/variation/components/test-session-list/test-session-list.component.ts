import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';
import { TestSessionsDataSource } from '../variation-view/testsessions.datasource';
import { TestSessionType } from '../../../core/types';

@Component({
  selector: 'visual-knight-test-session-list',
  templateUrl: './test-session-list.component.html',
  styleUrls: ['./test-session-list.component.scss']
})
export class TestSessionListComponent implements OnInit {
  @Input() dataSource: TestSessionsDataSource;

  displayedColumns = [
    'createdDate',
    'state',
    'stateChanged',
    'misMatchTolerance',
    'hasDiff'
  ];

  constructor() {}

  ngOnInit() {}

  showShortDate(testSession: TestSessionType) {
    // TODO: add created
    // return moment().diff(testSession.createdAt, 'hours') <= 35;
  }

  getFromNow(testSession: TestSessionType) {
    // TODO: add created
    // return moment(testSession.createdAt).fromNow();
  }

  onSelectTestSession(testSession: TestSessionType) {
    // TODO: select new test session
  }

  getUsername(testSession: TestSessionType) {
    return getTestSessionUsername(testSession);
  }
}

export function getTestSessionUsername(testSession: TestSessionType): string {
  // TODO: check data model test session -> missing user state change?
  // if (!testSession.stateChangedByUser && testSession.state === 'ACCEPTED') {
  //   return testSession.autoBaseline ? 'By System (autoBaseline)' : 'By System';
  // }
  // if (!testSession.stateChangedByUser) {
  //   return;
  // }
  // return testSession.stateChangedByUser.forename
  //   ? `${testSession.stateChangedByUser.forename} ${testSession.stateChangedByUser.lastname}`
  //   : testSession.stateChangedByUser.email;

  return 'By System';
}

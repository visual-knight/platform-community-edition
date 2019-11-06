import { Component, OnInit, Input } from '@angular/core';

import { TestSessionsDataSource } from '../variation-view/testsessions.datasource';
import { TestSessionType } from '../../../core/types';
import { formatDistanceToNow, differenceInHours, parseISO } from 'date-fns';
import { VariationService } from '../../services/variation.service';

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

  constructor(private variationService: VariationService) {}

  ngOnInit() {}

  showShortDate(testSession: TestSessionType) {
    return differenceInHours(parseISO(testSession.createdAt), new Date()) <= 35;
  }

  getFromNow(testSession: TestSessionType) {
    return formatDistanceToNow(parseISO(testSession.createdAt), {
      addSuffix: true
    });
  }

  onSelectTestSession(testSession: TestSessionType) {
    this.variationService.setSelectedTestSession(testSession);
  }

  getUsername(testSession: TestSessionType) {
    return getTestSessionUsername(testSession);
  }
}

export function getTestSessionUsername(testSession: TestSessionType): string {
  console.log(testSession.stateChangedByUser);
  if (!testSession.stateChangedByUser && testSession.state === 'ACCEPTED') {
    return testSession.autoBaseline ? 'By System (autoBaseline)' : 'By System';
  }
  if (!testSession.stateChangedByUser) {
    return;
  }

  return testSession.stateChangedByUser.forename
    ? `${testSession.stateChangedByUser.forename} ${
        testSession.stateChangedByUser.lastname
      }`
    : testSession.stateChangedByUser.email;
}

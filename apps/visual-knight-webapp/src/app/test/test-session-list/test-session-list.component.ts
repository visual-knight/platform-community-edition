import { Component, OnInit, Input } from '@angular/core';
import { TestSession, getTestSessionUsername } from '../../shared/models/testsession.model';
import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { SelectTestSessionIdAction } from '../state/test.actions';

@Component({
  selector: 'vk-test-session-list',
  templateUrl: './test-session-list.component.html',
  styleUrls: ['./test-session-list.component.scss']
})
export class TestSessionListComponent implements OnInit {
  @Input()
  dataSource;
  displayedColumns = ['createdDate', 'state', 'stateChanged', 'misMatchTolerance', 'hasDiff'];

  constructor(private store: Store) {}

  ngOnInit() {}

  showShortDate(testSession: TestSession) {
    return moment().diff(testSession.createdAt, 'hours') <= 35;
  }

  getFromNow(testSession: TestSession) {
    return moment(testSession.createdAt).fromNow();
  }

  onSelectTestSession(testSession: TestSession) {
    this.store.dispatch(new SelectTestSessionIdAction(testSession.id));
  }

  getUsername(testSession: TestSession) {
    return getTestSessionUsername(testSession);
  }
}

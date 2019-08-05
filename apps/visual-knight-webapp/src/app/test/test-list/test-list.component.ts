import { TestSession } from '../../shared/models/testsession.model';
import { Observable } from 'rxjs';
import { Test } from '../../shared/models/test.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TestState } from '../state/test.state';
import { SelectTestIdAction, TestDeleteAction } from '../state/test.actions';
import { rowsAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'vk-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  animations: [rowsAnimation]
})
export class TestListComponent implements OnInit {
  @Input() dataSource;
  displayedColumns = ['name', 'variations', 'viewVariations'];
  @Select(TestState.selectedTestId) selectedTestId: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {}

  onClickRow(row: Test) {
    this.store.dispatch(new SelectTestIdAction(row.id));
  }

  lastTestSessionIsSuccessfull(testSession: TestSession): boolean {
    return testSession.misMatchPercentage < testSession.misMatchTolerance;
  }

  onDeleteTest(test: Test) {
    this.store.dispatch(new TestDeleteAction(test));
  }

  stopPropagationClick($event: Event) {
    $event.stopPropagation();
  }
}

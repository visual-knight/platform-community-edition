import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { rowsAnimation } from '../../../shared/animations';
import { TestsDataSource } from '../../test.datasource';
import { Test, TestSession } from '@generated/photonjs';

@Component({
  selector: 'visual-knight-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  animations: [rowsAnimation]
})
export class TestListComponent implements OnInit {
  @Input() dataSource: TestsDataSource;
  displayedColumns = ['name', 'variations', 'viewVariations'];
  selectedTestId: Observable<string>;

  constructor() {}

  ngOnInit() {}

  onClickRow(row: Test) {
    // this.store.dispatch(new SelectTestIdAction(row.id));
  }

  lastTestSessionIsSuccessfull(testSession: TestSession): boolean {
    return testSession.misMatchPercentage < testSession.misMatchTolerance;
  }

  onDeleteTest(test: Test) {
    // this.store.dispatch(new TestDeleteAction(test));
  }

  stopPropagationClick($event: Event) {
    $event.stopPropagation();
  }
}

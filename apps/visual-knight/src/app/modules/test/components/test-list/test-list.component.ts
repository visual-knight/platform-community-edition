import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { rowsAnimation } from '../../../shared/animations';
import { TestsDataSource } from '../../test.datasource';
import { TestType, TestSessionType } from '../../../core/types';
import { TestService } from '../../services/test.service';

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

  constructor(private testService: TestService) {}

  ngOnInit() {}

  onClickRow(row: TestType) {
    // TODO: implement selected test id into client side graphql
    // this.store.dispatch(new SelectTestIdAction(row.id));
  }

  lastTestSessionIsSuccessfull(testSession: TestSessionType): boolean {
    return testSession.misMatchPercentage < testSession.misMatchTolerance;
  }

  onDeleteTest(test: TestType) {
    this.testService.removeTest(test.id);
  }

  stopPropagationClick($event: Event) {
    $event.stopPropagation();
  }
}

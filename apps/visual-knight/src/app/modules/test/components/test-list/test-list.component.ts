import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { rowsAnimation } from '../../../shared/animations';
import { TestsDataSource } from '../../test.datasource';
import {
  TestType,
  TestSessionType,
  SelectedTestGQL
} from '../../../core/types';
import { TestService } from '../../services/test.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  animations: [rowsAnimation]
})
export class TestListComponent implements OnInit {
  @Input() dataSource: TestsDataSource;
  displayedColumns = ['name', 'variations', 'viewVariations'];
  selectedTestId: Observable<
    string
  > = this.selectedTestGQL
    .watch()
    .valueChanges.pipe(map(({ data }) => data.selectedTest));

  constructor(
    private testService: TestService,
    private selectedTestGQL: SelectedTestGQL
  ) {}

  ngOnInit() {}

  onClickRow(test: TestType) {
    this.testService.setSelectedTest(test);
  }

  onDeleteTest(test: TestType) {
    this.testService
      .removeTest(test.id)
      .pipe(first())
      .subscribe();
  }

  stopPropagationClick($event: Event) {
    $event.stopPropagation();
  }
}

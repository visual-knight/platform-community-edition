import { Component, Input, OnInit } from '@angular/core';
import { rowsAnimation } from '../../../shared/animations';
import { TestsDataSource } from '../../test.datasource';
import {
  TestType,
} from '../../../core/types';
import { TestService } from '../../services/test.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  animations: [rowsAnimation]
})
export class TestListComponent implements OnInit {
  @Input() dataSource: TestsDataSource;
  displayedColumns = ['name', 'variations', 'viewVariations'];

  constructor(
    private testService: TestService,
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

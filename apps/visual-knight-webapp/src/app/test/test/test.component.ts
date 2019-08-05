import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestsDataSource } from '../tests.datasource';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Test } from '../../shared/models/test.model';
import { TestState } from '../state/test.state';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FilterState } from '../../shared/modules/filters/state/filter/filter.state';

@Component({
  selector: 'vk-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  testDataSource: TestsDataSource;

  @Select(FilterState.getFilteredTestList)
  testList$: Observable<Test[]>;

  constructor() {}

  ngOnInit() {
    this.testDataSource = new TestsDataSource(this.testList$);
  }

  ngOnDestroy() {}
}

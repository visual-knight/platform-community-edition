import { Component, OnInit } from '@angular/core';
import { TestsDataSource } from './test.datasource';
import { Observable } from 'rxjs';
import { TestType } from '../core/types';

@Component({
  selector: 'visual-knight-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testDataSource: TestsDataSource;

  // TODO: get filtered Testlist
  filteredTestList$: Observable<TestType[]>;

  constructor() {}

  ngOnInit() {
    this.testDataSource = new TestsDataSource(this.filteredTestList$);
  }
}

import { Component, OnInit } from '@angular/core';
import { TestsDataSource } from './test.datasource';
import { FiltersService } from '../filters/services/filters.service';

@Component({
  selector: 'visual-knight-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testDataSource: TestsDataSource;

  filteredTestList$ = this.filterService.filteredTestList$();

  constructor(private filterService: FiltersService) {}

  ngOnInit() {
    this.testDataSource = new TestsDataSource(this.filteredTestList$);
  }
}

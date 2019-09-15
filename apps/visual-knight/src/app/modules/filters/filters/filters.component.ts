import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectType, TestSessionType } from '../../core/types';

@Component({
  selector: 'visual-knight-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterForm = this.formBuilder.group({
    testNameFilter: null,
    browserFilter: null,
    deviceFilter: null,
    projectFilter: null,
    testStateFilter: null,
    customFilter: null
  });

  panelOpenState = false;

  projectList$: Observable<ProjectType[]>;

  activeFilterCount$: Observable<number>;
  browserList$: Observable<any[]>;
  deviceList$: Observable<any[]>;
  testSessionStateList$: Observable<TestSessionType[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  clearFilters() {}
}

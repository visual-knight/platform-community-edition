import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectType } from '../../core/types';
import { Device } from '../../shared/device.model';
import { Browser } from '../../shared/browser.model';
import { map, tap, first } from 'rxjs/operators';
import { FiltersService } from '../services/filters.service';
import { ProjectService } from '../../project/services/project.service';

@Component({
  selector: 'visual-knight-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private filtersService: FiltersService,
    private projectService: ProjectService
  ) {}

  filterForm: FormGroup;
  panelOpenState: Boolean;
  projectList$: Observable<
    ProjectType[]
  > = this.projectService
    .projectList()
    .pipe(map(({ data }) => data && data.projects));
  browserList$: string[] = Browser.getBrowserList();
  deviceList$: string[] = Device.getDeviceList();
  testSessionStateList$: string[] = [
    'ACCEPTED',
    'DECLINED',
    'PENDING',
    'UNRESOLVED'
  ];
  activeFilterCount$: Observable<number> = this.filtersService.filterState.pipe(
    map(
      filterState =>
        filterState.projectFilter.length +
        filterState.browserFilter.length +
        filterState.deviceFilter.length +
        (filterState.testNameFilter ? 1 : 0) +
        filterState.testStateFilter.length
    )
  );

  ngOnInit() {
    this.panelOpenState = false;

    // create form builder with default values from filter service
    this.filtersService.filterState
      .pipe(
        first(),
        tap(filterState => {
          this.filterForm = this.formBuilder.group({
            testNameFilter: [filterState.testNameFilter],
            browserFilter: [filterState.browserFilter],
            deviceFilter: [filterState.deviceFilter],
            projectFilter: [filterState.projectFilter],
            testStateFilter: [filterState.testStateFilter]
          });
        })
      )
      .subscribe();

    // subscribe to updates in form and pass them to filter service
    this.filterForm.valueChanges.subscribe(
      ({
        testNameFilter,
        browserFilter,
        deviceFilter,
        projectFilter,
        testStateFilter
      }) => {
        this.filtersService.setFilter({
          testNameFilter,
          browserFilter,
          deviceFilter,
          projectFilter,
          testStateFilter
        });
      }
    );
  }

  clearFilters() {
    this.filterForm.setValue(this.filtersService.initFilterState);
  }
}

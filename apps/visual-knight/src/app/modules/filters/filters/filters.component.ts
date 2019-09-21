import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
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
  filterForm = this.formBuilder.group({
    testNameFilter: null,
    browserFilter: null,
    deviceFilter: null,
    projectFilter: null,
    testStateFilter: null
  });

  panelOpenState = false;

  projectList$: Observable<ProjectType[]> = this.projectService.projectList();
  browserList$: Observable<any[]> = of(Browser.getBrowserList());
  deviceList$: Observable<any[]> = of(Device.getDeviceList());
  testSessionStateList$: Observable<
    ('ACCEPTED' | 'DECLINED' | 'PENDING' | 'UNRESOLVED')[]
  > = of(['ACCEPTED', 'DECLINED', 'PENDING', 'UNRESOLVED']);

  filters$ = combineLatest(
    this.filtersService.testNameFilter,
    this.filtersService.browserFilter,
    this.filtersService.deviceFilter,
    this.filtersService.projectFilter,
    this.filtersService.testStateFilter
  );

  activeFilterCount$: Observable<number> = this.filters$.pipe(
    map(
      ([
        testNameFilter,
        browserFilter,
        deviceFilter,
        projectFilter,
        testStateFilter
      ]) =>
        projectFilter.length +
        browserFilter.length +
        deviceFilter.length +
        (testNameFilter ? 1 : 0) +
        testStateFilter.length
    )
  );

  constructor(
    private formBuilder: FormBuilder,
    private filtersService: FiltersService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(
      ({
        testNameFilter,
        browserFilter,
        deviceFilter,
        projectFilter,
        testStateFilter
      }) => {
        this.filtersService.testNameFilter.next(testNameFilter);
        this.filtersService.browserFilter.next(browserFilter);
        this.filtersService.deviceFilter.next(deviceFilter);
        this.filtersService.projectFilter.next(projectFilter);
        this.filtersService.testStateFilter.next(testStateFilter);
      }
    );
    this.filters$
      .pipe(
        first(),
        tap(
          ([
            testNameFilter,
            browserFilter,
            deviceFilter,
            projectFilter,
            testStateFilter
          ]) => {
            this.filterForm.setValue({
              testNameFilter,
              browserFilter,
              deviceFilter,
              projectFilter,
              testStateFilter
            });
          }
        )
      )
      .subscribe();
  }

  clearFilters() {}
}

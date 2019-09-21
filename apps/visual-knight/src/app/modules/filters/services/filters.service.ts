import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Browser } from '../../shared/browser.model';
import { Device } from '../../shared/device.model';
import { ProjectType, TestType } from '../../core/types';
import { map } from 'rxjs/operators';
import { TestService } from '../../test/services/test.service';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  testNameFilter: BehaviorSubject<string> = new BehaviorSubject(null);
  browserFilter: BehaviorSubject<Browser[]> = new BehaviorSubject([]);
  deviceFilter: BehaviorSubject<Device[]> = new BehaviorSubject([]);
  projectFilter: BehaviorSubject<ProjectType[]> = new BehaviorSubject([]);
  testStateFilter: BehaviorSubject<string[]> = new BehaviorSubject([]);
  testList$ = this.testService.testList();

  constructor(private testService: TestService) {}

  filteredTestList$() {
    return combineLatest(
      this.testList$,
      this.testNameFilter,
      this.browserFilter,
      this.deviceFilter,
      this.projectFilter,
      this.testStateFilter
    ).pipe(
      map(
        ([
          testList,
          testNameFilter,
          browserFilter,
          deviceFilter,
          projectFilter,
          testStateFilter
        ]) => {
          let filteredTests = testList;

          if (testNameFilter) {
            filteredTests = filteredTests.filter(
              test =>
                test.name
                  .toLowerCase()
                  .indexOf(testNameFilter.toLowerCase()) !== -1
            );
          }

          if (browserFilter.length > 0) {
            filteredTests = filteredTests.filter(
              test =>
                !!browserFilter.find(
                  browser =>
                    !!test.variations.find(
                      variation => variation.browserName === browser
                    )
                )
            );
          }

          if (deviceFilter.length > 0) {
            filteredTests = filteredTests.filter(
              test =>
                !!deviceFilter.find(
                  device =>
                    !!test.variations.find(
                      variation => variation.deviceName === device
                    )
                )
            );
          }

          if (projectFilter.length > 0) {
            filteredTests = filteredTests.filter(
              test =>
                !!projectFilter.find(project => test.project.id === project.id)
            );
          }

          if (testStateFilter.length > 0) {
            filteredTests = filteredTests.filter(
              test =>
                !!testStateFilter.find(
                  testState =>
                    !!test.variations.find(
                      variation => variation.testSessions[0].state === testState
                    )
                )
            );
          }

          return filteredTests;
        }
      )
    );
  }
}

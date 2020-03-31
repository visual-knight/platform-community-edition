import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Browser } from '../../shared/browser.model';
import { Device } from '../../shared/device.model';
import { ProjectType } from '../../core/types';
import { map } from 'rxjs/operators';
import { TestService } from '../../test/services/test.service';

interface IFilter {
  testNameFilter: string;
  browserFilter: Browser[];
  deviceFilter: Device[];
  projectFilter: ProjectType[];
  testStateFilter: string[];
}

@Injectable({ providedIn: 'root' })
export class FiltersService {
  constructor(private testService: TestService) {}

  initFilterState: IFilter = {
    testNameFilter: '',
    browserFilter: [],
    deviceFilter: [],
    projectFilter: [],
    testStateFilter: []
  };

  filterState: BehaviorSubject<IFilter> = new BehaviorSubject(
    this.initFilterState
  );

  setFilter(state: IFilter) {
    this.filterState.next(state);
  }

  filteredTestList$() {
    return combineLatest(
      this.testService.testList().pipe(map(({ data }) => data && data.tests)),
      this.filterState
    ).pipe(
      map(([testList, filterState]) => {
        console.log(filterState);

        let filteredTests = testList;

        if (filterState.testNameFilter) {
          filteredTests = filteredTests.filter(
            test =>
              test.name
                .toLowerCase()
                .indexOf(filterState.testNameFilter.toLowerCase()) !== -1
          );
        }

        if (filterState.browserFilter.length > 0) {
          filteredTests = filteredTests.filter(
            test =>
              !!filterState.browserFilter.find(
                browser =>
                  !!test.variations.find(
                    variation => variation.browserName === browser
                  )
              )
          );
        }

        if (filterState.deviceFilter.length > 0) {
          filteredTests = filteredTests.filter(
            test =>
              !!filterState.deviceFilter.find(
                device =>
                  !!test.variations.find(
                    variation => variation.deviceName === device
                  )
              )
          );
        }

        if (filterState.projectFilter.length > 0) {
          filteredTests = filteredTests.filter(
            test =>
              !!filterState.projectFilter.find(
                project => test.project.id === project.id
              )
          );
        }

        if (filterState.testStateFilter.length > 0) {
          filteredTests = filteredTests.filter(
            test =>
              !!filterState.testStateFilter.find(
                testState =>
                  !!test.variations.find(
                    variation => variation.testSessions[0].state === testState
                  )
              )
          );
        }

        return filteredTests;
      })
    );
  }
}

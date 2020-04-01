import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import {
  MatExpansionModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersService } from '../services/filters.service';
import { ProjectType } from '../../core/types';
import { Browser } from '../../shared/browser.model';
import { Device } from '../../shared/device.model';
import { BehaviorSubject, of } from 'rxjs';
import { ProjectService } from '../../project/services/project.service';
import { By } from '@angular/platform-browser';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let filterService: FiltersService;
  let projectService: ProjectService;

  const emptyFilterState = {
    testNameFilter: '',
    browserFilter: [],
    deviceFilter: [],
    projectFilter: [],
    testStateFilter: []
  };

  const usedFilterState = {
    testNameFilter: 'some test name',
    browserFilter: ['Chrome'],
    deviceFilter: ['Windows'],
    projectFilter: [
      {
        id: '12',
        name: 'some project name'
      }
    ],
    testStateFilter: ['ACCEPTED']
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [
        MatExpansionModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        ApolloTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    filterService = TestBed.get(FiltersService);
    projectService = TestBed.get(ProjectService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('snapshot filter are empty', () => {
    const filter = emptyFilterState;
    filterService.setFilter(filter);

    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('snapshot filter used', () => {
    const filter = usedFilterState;
    filterService.setFilter(filter);

    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  describe('onInit', () => {
    it('should set form values according to filterService', () => {
      const filter = usedFilterState;
      filterService.setFilter(filter);

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.filterForm.getRawValue()).toStrictEqual(filter);
    });

    it('should call filterService state on change', () => {
      const filter = usedFilterState;
      filterService.setFilter = jest.fn();

      component.filterForm.setValue(filter);
      fixture.detectChanges();

      expect(filterService.setFilter).toHaveBeenCalledWith(filter);
    });
  });

  describe('clearFilters', () => {
    it('should call method on click', () => {
      const filter = usedFilterState;
      component.filterForm.setValue(filter);
      component.clearFilters = jest.fn()

      fixture.nativeElement.querySelector('#clearFilters').click()

      expect(component.clearFilters).toHaveBeenCalledTimes(1);
    });

    it('should set to default state', () => {
      const filter = usedFilterState;
      component.filterForm.setValue(filter);

      component.clearFilters();

      expect(component.filterForm.getRawValue()).toStrictEqual(emptyFilterState);
    });
  });
});

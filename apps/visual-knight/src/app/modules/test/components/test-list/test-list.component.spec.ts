import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { TestListComponent } from './test-list.component';
import { of } from 'rxjs';
import { TestDataFragment } from '../../../core/types';
import { TestsDataSource } from '../../test.datasource';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestService } from '../../services/test.service';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;
  let router: RouterTestingModule;
  let testService: TestService;

  const test: TestDataFragment = {
    id: '12',
    name: 'name 1',
    variations: [
      {
        id: '33',
        browserName: 'Chrome',
        deviceName: 'Device name',
        createdAt: Date.now(),
        testSessions: []
      }
    ],
    project: {
      id: '44'
    }
  };
  const testList: TestDataFragment[] = [test];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestListComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        RouterTestingModule,
        MatMenuModule,
        ApolloTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListComponent);
    router = TestBed.get(RouterTestingModule);
    testService = TestBed.get(TestService);
    component = fixture.componentInstance;
    component.dataSource = new TestsDataSource(of(testList));
    fixture.detectChanges();
  });

  it('should render not empty test list', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should delete test', () => {
    const onDeleteTest = jest.spyOn(component, 'onDeleteTest');
    const removeTest = jest.spyOn(testService, 'removeTest');


    const rowElement: DebugElement = fixture.debugElement.query(
      By.css('[id*=test_row]')
    );
    rowElement.query(By.css('#actionMenuBtn')).nativeElement.click();
    rowElement.query(By.css('#deleteBtn')).nativeElement.click();

    expect(onDeleteTest).toHaveBeenCalledWith(test);
    expect(removeTest).toHaveBeenCalledWith(test.id);
  });
});

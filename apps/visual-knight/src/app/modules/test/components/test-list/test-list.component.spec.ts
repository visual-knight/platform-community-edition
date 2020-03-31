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

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render not empty test list', () => {
    const testList: TestDataFragment[] = [
      {
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
      }
    ];
    component.dataSource = new TestsDataSource(of(testList));

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

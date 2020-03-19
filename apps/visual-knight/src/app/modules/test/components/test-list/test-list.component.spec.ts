import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { TestListComponent } from './test-list.component';

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
        ApolloTestingModule
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
});

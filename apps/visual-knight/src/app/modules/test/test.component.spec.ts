import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
  MatIconModule,
  MatMenuModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { TestListComponent } from '../test/components/test-list/test-list.component';
import { FiltersComponent } from '../filters/filters/filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestListComponent, FiltersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ApolloTestingModule,
        BrowserAnimationsModule,
        MatInputModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

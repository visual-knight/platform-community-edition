import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import {
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';
import { AccountManagementComponent } from './account-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementComponent],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTooltipModule,
        ApolloTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    component.user$ = of({
      id: null,
      email: '',
      apiKey: '',
      active: null,
      role: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

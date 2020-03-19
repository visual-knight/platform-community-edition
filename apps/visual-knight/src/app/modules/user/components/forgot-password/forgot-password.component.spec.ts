import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatProgressBarModule,
  MatCardModule,
  MatSnackBarModule,
  MatInputModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        MatFormFieldModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatCardModule,
        RouterTestingModule,
        ApolloTestingModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

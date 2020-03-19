import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {
  MatCardModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MatCardModule,
        MatProgressBarModule,
        RouterTestingModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTooltipModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ApolloTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

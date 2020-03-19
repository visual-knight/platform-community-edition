import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInvitationComponent } from './verify-invitation.component';
import { MatInputModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VerifyInvitationComponent', () => {
  let component: VerifyInvitationComponent;
  let fixture: ComponentFixture<VerifyInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyInvitationComponent],
      imports: [
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ApolloTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInvitationComponent } from './verify-invitation.component';

describe('VerifyInvitationComponent', () => {
  let component: VerifyInvitationComponent;
  let fixture: ComponentFixture<VerifyInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyInvitationComponent ]
    })
    .compileComponents();
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

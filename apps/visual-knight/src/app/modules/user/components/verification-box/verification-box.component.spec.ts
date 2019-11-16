import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationBoxComponent } from './verification-box.component';

describe('VerificationBoxComponent', () => {
  let component: VerificationBoxComponent;
  let fixture: ComponentFixture<VerificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

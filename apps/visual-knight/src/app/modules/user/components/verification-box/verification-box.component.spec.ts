import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationBoxComponent } from './verification-box.component';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('VerificationBoxComponent', () => {
  let component: VerificationBoxComponent;
  let fixture: ComponentFixture<VerificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationBoxComponent],
      imports: [ApolloTestingModule]
    }).compileComponents();
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

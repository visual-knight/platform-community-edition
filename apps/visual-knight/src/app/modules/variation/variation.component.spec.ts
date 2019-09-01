import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationComponent } from './variation.component';

describe('VariationComponent', () => {
  let component: VariationComponent;
  let fixture: ComponentFixture<VariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationViewComponent } from './variation-view.component';

describe('VariationViewComponent', () => {
  let component: VariationViewComponent;
  let fixture: ComponentFixture<VariationViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [VariationViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

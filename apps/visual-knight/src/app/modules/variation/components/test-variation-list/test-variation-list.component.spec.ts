import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationListComponent } from './test-variation-list.component';

describe('TestVariationListComponent', () => {
  let component: VariationListComponent;
  let fixture: ComponentFixture<VariationListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [VariationListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

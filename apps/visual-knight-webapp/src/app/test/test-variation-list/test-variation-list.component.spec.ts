import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVariationListComponent } from './test-variation-list.component';

describe('TestVariationListComponent', () => {
  let component: TestVariationListComponent;
  let fixture: ComponentFixture<TestVariationListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TestVariationListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVariationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

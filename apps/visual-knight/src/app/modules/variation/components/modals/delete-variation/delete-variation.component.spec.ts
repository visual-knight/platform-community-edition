import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVariationModalComponent } from './delete-variation.component';

describe('DeleteVariationComponent', () => {
  let component: DeleteVariationModalComponent;
  let fixture: ComponentFixture<DeleteVariationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVariationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVariationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

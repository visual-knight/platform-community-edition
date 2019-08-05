import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVariationComponent } from './delete-variation.component';

describe('DeleteVariationComponent', () => {
  let component: DeleteVariationComponent;
  let fixture: ComponentFixture<DeleteVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

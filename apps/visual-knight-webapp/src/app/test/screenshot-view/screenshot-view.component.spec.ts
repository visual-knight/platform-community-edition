import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotViewComponent } from './screenshot-view.component';

describe('ScreenshotViewComponent', () => {
  let component: ScreenshotViewComponent;
  let fixture: ComponentFixture<ScreenshotViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ScreenshotViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

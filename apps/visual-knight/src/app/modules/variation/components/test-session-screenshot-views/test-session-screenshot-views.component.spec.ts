import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionScreenshotViewsComponent } from './test-session-screenshot-views.component';

describe('TestSessionScreenshotViewsComponent', () => {
  let component: TestSessionScreenshotViewsComponent;
  let fixture: ComponentFixture<TestSessionScreenshotViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionScreenshotViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionScreenshotViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

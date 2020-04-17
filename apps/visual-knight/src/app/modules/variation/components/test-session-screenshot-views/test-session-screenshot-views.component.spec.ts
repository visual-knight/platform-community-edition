import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';
import { DiffViewComponent } from '../diff-view/diff-view.component';
import { ScreenshotImagePipe } from '../../../shared/pipes/screenshot-image.pipe';
import { IconModule } from '../../../shared/modules/icon/icon.module';
import { TestSessionScreenshotViewsComponent } from './test-session-screenshot-views.component';

describe('TestSessionScreenshotViewsComponent', () => {
  let component: TestSessionScreenshotViewsComponent;
  let fixture: ComponentFixture<TestSessionScreenshotViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ScreenshotImagePipe],
      declarations: [TestSessionScreenshotViewsComponent, DiffViewComponent, ScreenshotImagePipe],
      imports: [MatIconModule, MatSlideToggleModule, MatTooltipModule, MatToolbarModule, MatDialogModule, IconModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionScreenshotViewsComponent);
    component = fixture.componentInstance;
    component.testSession = {
      id: null,
      state: null,
      misMatchTolerance: null,
      autoBaseline: null,
      isSuccessful: null,
      createdAt: null
    };
    component.variation = {
      id: null,
      deviceName: null,
      browserName: '',
      createdAt: null,
      testSessions: null,
      isLastSuccessful: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

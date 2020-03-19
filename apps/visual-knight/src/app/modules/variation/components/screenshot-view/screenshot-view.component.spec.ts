import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { ScreenshotViewComponent } from './screenshot-view.component';
import { ScreenshotImagePipe } from '../../../shared/pipes/screenshot-image.pipe';

describe('ScreenshotViewComponent', () => {
  let component: ScreenshotViewComponent;
  let fixture: ComponentFixture<ScreenshotViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenshotViewComponent, ScreenshotImagePipe],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [MatDialogModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

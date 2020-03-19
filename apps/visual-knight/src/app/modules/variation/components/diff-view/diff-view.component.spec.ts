import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiffViewComponent } from './diff-view.component';
import { ScreenshotImagePipe } from '../../../shared/pipes/screenshot-image.pipe';

describe('DiffViewComponent', () => {
  let component: DiffViewComponent;
  let fixture: ComponentFixture<DiffViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiffViewComponent, ScreenshotImagePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

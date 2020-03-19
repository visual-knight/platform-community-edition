import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material';
import { BrowserIconComponent } from '../browser-icon/browser-icon.component';

describe('BrowserIconComponent', () => {
  let component: BrowserIconComponent;
  let fixture: ComponentFixture<BrowserIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserIconComponent],
      imports: [MatTooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserIconComponent);
    component = fixture.componentInstance;
    component.browser = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

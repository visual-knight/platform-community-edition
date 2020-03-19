import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatMenuModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { TestSessionScreenshotViewsComponent } from '../test-session-screenshot-views/test-session-screenshot-views.component';
import { TestSessionListComponent } from '../test-session-list/test-session-list.component';
import { DiffViewComponent } from '../diff-view/diff-view.component';
import { VariationViewComponent } from './variation-view.component';
import { IconModule } from '../../../shared/modules/icon/icon.module';
import { ScreenshotImagePipe } from '../../../shared/pipes/screenshot-image.pipe';

describe('VariationViewComponent', () => {
  let component: VariationViewComponent;
  let fixture: ComponentFixture<VariationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VariationViewComponent,
        TestSessionScreenshotViewsComponent,
        TestSessionListComponent,
        DiffViewComponent,
        ScreenshotImagePipe
      ],
      imports: [
        MatMenuModule,
        MatExpansionModule,
        ApolloTestingModule,
        IconModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

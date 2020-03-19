import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ScreenshotImagePipe } from '../../../shared/pipes/screenshot-image.pipe';
import { VariationListComponent } from './test-variation-list.component';
import { APP_BASE_HREF } from '@angular/common';
import {
  ApolloTestingModule,
} from 'apollo-angular/testing';

describe('TestVariationListComponent', () => {
  let component: VariationListComponent;
  let fixture: ComponentFixture<VariationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariationListComponent, ScreenshotImagePipe],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      imports: [
        MatCardModule,
        MatDialogModule,
        RouterTestingModule,
        ApolloTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

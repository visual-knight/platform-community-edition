import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatExpansionModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatMenuModule,
  MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from './modules/icon/icon.module';
import { ScreenshotImagePipe } from './pipes/screenshot-image.pipe';

const SHARED_MODULES = [
  CommonModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  // MatDividerModule,
  // MatBadgeModule,
  // MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatMenuModule,
  MatExpansionModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,

  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule,
  IconModule
];
const SHARED_COMPONENTS = [ScreenshotImagePipe];
@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {}

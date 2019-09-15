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
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatInputModule,
  MatSnackBarModule,
  MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatMenuModule,
  MatExpansionModule,
  MatTableModule,
  MatTooltipModule,

  ReactiveFormsModule,
  FormsModule,
  RouterModule
];
const SHARED_COMPONENTS = [];
@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {}

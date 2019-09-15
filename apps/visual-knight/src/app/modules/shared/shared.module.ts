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
  MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

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

  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule
];
const SHARED_COMPONENTS = [];
@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {}

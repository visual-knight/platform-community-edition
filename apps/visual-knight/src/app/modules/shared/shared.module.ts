import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const SHARED_MODULES = [
  CommonModule,
  // MatToolbarModule,
  // MatCardModule,
  // MatIconModule,
  // MatButtonModule,
  // MatDividerModule,
  // MatBadgeModule,
  // MatFormFieldModule,
  // MatInputModule,
  // MatSnackBarModule,
  // MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatMenuModule,

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

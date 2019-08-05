import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { NgxsModule } from '@ngxs/store';
import { ProjectState } from './state/project.state';
import { ProjectService } from './project.service';
import {
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddProjectComponent } from './modals/add-new-project/project-add.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';
import { PricingModule } from '../shared/modules/pricing/pricing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgxsModule.forFeature([ProjectState]),
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    ClipboardModule,
    FlexLayoutModule,
    PricingModule,
    MatCardModule,
    MatToolbarModule
  ],
  declarations: [ProjectComponent, AddProjectComponent, DeleteModalComponent],
  providers: [ProjectService],
  entryComponents: [AddProjectComponent, DeleteModalComponent]
})
export class ProjectModule {}

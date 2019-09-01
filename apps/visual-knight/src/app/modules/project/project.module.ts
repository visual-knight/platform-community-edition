import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { AddProjectModalComponent } from './components/modals/add-new-project/project-add.component';

const routes: Routes = [{ path: '', component: ProjectComponent }];

@NgModule({
  declarations: [
    ProjectComponent,
    AddProjectModalComponent,
    DeleteModalComponent
  ],
  imports: [CommonModule, ProjectRoutingModule, RouterModule.forChild(routes)],
  entryComponents: [AddProjectModalComponent, DeleteModalComponent]
})
export class ProjectModule {}

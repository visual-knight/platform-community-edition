import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  { path: '', component: ProjectComponent }
];

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestSessionRoutingModule } from './test-session-routing.module';
import { TestSessionComponent } from './test-session.component';

const routes: Routes = [
  { path: '', component: TestSessionComponent }
];

@NgModule({
  declarations: [TestSessionComponent],
  imports: [
    CommonModule,
    TestSessionRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class TestSessionModule { }

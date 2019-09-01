import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestSessionComponent } from './test-session.component';

const routes: Routes = [{ path: '', component: TestSessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestSessionRoutingModule { }

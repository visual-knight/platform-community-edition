import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VariationComponent } from './variation.component';

const routes: Routes = [{ path: '', component: VariationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationRoutingModule { }

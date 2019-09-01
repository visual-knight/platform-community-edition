import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { VariationRoutingModule } from './variation-routing.module';
import { VariationComponent } from './variation.component';

const routes: Routes = [
  { path: '', component: VariationComponent }
];

@NgModule({
  declarations: [VariationComponent],
  imports: [
    CommonModule,
    VariationRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class VariationModule { }

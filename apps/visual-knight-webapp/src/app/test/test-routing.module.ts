import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestVariationListComponent } from './test-variation-list/test-variation-list.component';
import { VariationViewComponent } from './variation-view/variation-view.component';

const routes: Routes = [
  { path: '', component: TestComponent },
  { path: ':testId/variation-list', component: TestVariationListComponent },
  { path: ':testId/variation/:variationId', component: VariationViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }

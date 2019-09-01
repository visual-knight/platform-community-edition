import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { VariationListComponent } from './components/test-variation-list/test-variation-list.component';
import { VariationViewComponent } from './components/variation-view/variation-view.component';
import { DeleteVariationModalComponent } from './components/modals/delete-variation/delete-variation.component';
import { ScreenshotViewComponent } from './components/screenshot-view/screenshot-view.component';
import { TestSessionListComponent } from './components/test-session-list/test-session-list.component';

const routes: Routes = [
  { path: ':testId', component: VariationListComponent },
  { path: ':testId/:variationId', component: VariationViewComponent }
];

@NgModule({
  declarations: [
    VariationListComponent,
    VariationViewComponent,
    TestSessionListComponent,
    DeleteVariationModalComponent,
    ScreenshotViewComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  entryComponents: [DeleteVariationModalComponent, ScreenshotViewComponent]
})
export class VariationModule {}

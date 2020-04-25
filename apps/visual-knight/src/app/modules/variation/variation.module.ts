import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { VariationListComponent } from './components/test-variation-list/test-variation-list.component';
import { VariationViewComponent } from './components/variation-view/variation-view.component';
import { DeleteVariationModalComponent } from './components/modals/delete-variation/delete-variation.component';
import { ScreenshotViewComponent } from './components/screenshot-view/screenshot-view.component';
import { TestSessionListComponent } from './components/test-session-list/test-session-list.component';
import { TestSessionScreenshotViewsComponent } from './components/test-session-screenshot-views/test-session-screenshot-views.component';
import { SharedModule } from '../shared/shared.module';
import { DiffViewComponent } from './components/diff-view/diff-view.component';
import { DrawAreaComponent } from './components/modals/draw-area/draw-area.component';

const routes: Routes = [
  { path: ':testId', component: VariationListComponent },
  { path: ':testId/:variationId', component: VariationViewComponent }
];

@NgModule({
  declarations: [
    VariationListComponent,
    VariationViewComponent,
    TestSessionListComponent,
    TestSessionScreenshotViewsComponent,
    DeleteVariationModalComponent,
    DrawAreaComponent,
    ScreenshotViewComponent,
    DiffViewComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  entryComponents: [
    DeleteVariationModalComponent,
    ScreenshotViewComponent,
    DrawAreaComponent
  ]
})
export class VariationModule {}

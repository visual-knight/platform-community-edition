import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import {
  MatProgressSpinnerModule,
  MatSelectModule,
  MatExpansionModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TestVariationListComponent } from './test-variation-list/test-variation-list.component';
import { VariationViewComponent } from './variation-view/variation-view.component';
import { TestSessionScreenshotViewsComponent } from './test-session-screenshot-views/test-session-screenshot-views.component';
import { DiffViewComponent } from './diff-view/diff-view.component';
import { TestSessionListComponent } from './test-session-list/test-session-list.component';
import { DeleteVariationComponent } from './modals/delete-variation/delete-variation.component';
import { ScreenshotViewComponent } from './screenshot-view/screenshot-view.component';
import { TestListComponent } from './test-list/test-list.component';
import { ImageStorePipe } from './image-store.pipe';
import { TestService } from './test.service';
import { NgxsModule } from '@ngxs/store';
import { TestState } from './state/test.state';
import { IconModule } from '../shared/modules/icon/icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { FiltersModule } from '../shared/modules/filters/filters.module';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    FlexLayoutModule,
    IconModule,
    NgxsModule.forFeature([TestState]),
    SharedModule,
    FiltersModule
  ],
  declarations: [
    TestComponent,
    TestListComponent,
    VariationViewComponent,
    ImageStorePipe,
    TestVariationListComponent,
    ScreenshotViewComponent,
    DeleteVariationComponent,
    TestSessionListComponent,
    DiffViewComponent,
    TestSessionScreenshotViewsComponent
  ],
  providers: [TestService],
  entryComponents: [ScreenshotViewComponent, DeleteVariationComponent]
})
export class TestModule {}

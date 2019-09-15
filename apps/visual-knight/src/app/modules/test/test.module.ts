import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { SharedModule } from '../shared/shared.module';
import { FiltersModule } from '../filters/filters.module';

const routes: Routes = [{ path: '', component: TestComponent }];

@NgModule({
  declarations: [TestComponent, TestListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FiltersModule
  ]
})
export class TestModule {}

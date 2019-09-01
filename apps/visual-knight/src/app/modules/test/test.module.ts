import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { TestListComponent } from './components/test-list/test-list.component';

const routes: Routes = [{ path: '', component: TestComponent }];

@NgModule({
  declarations: [TestComponent, TestListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class TestModule {}

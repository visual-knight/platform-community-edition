import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { TestListComponent } from './components/test-list/test-list.component';

const routes: Routes = [{ path: '', component: TestComponent }];

@NgModule({
  declarations: [TestComponent, TestListComponent],
  imports: [CommonModule, TestRoutingModule, RouterModule.forChild(routes)]
})
export class TestModule {}

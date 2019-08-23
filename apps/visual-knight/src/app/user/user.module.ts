import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserContainerComponent } from './user-container/user-container.component';


@NgModule({
  declarations: [UserContainerComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

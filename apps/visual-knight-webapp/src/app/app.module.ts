import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import {HeaderComponent} from './header-top/header-top.component'
@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, HeaderComponent, AdminLayoutComponent],
  imports: [BrowserModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

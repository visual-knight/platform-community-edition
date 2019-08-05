import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HeaderComponent } from './header-top/header-top.component';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { AppRoutingModule } from './routing/app-routing.module';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from './auth/state/auth.state';
import { AppState } from './state/app.state';
import { AuthService } from './auth/auth.service';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { TestModule } from './test/test.module';
import { ProjectModule } from './project/project.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    HeaderComponent,
    AdminLayoutComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    MatMenuModule,
    AppRoutingModule,
    TestModule,
    ProjectModule,
    SharedModule,
    SharedArrayBuffer
    NgxsModule.forRoot([AppState, AuthState])
  ]
  // providers: [
  //   AuthService,
  //   {
  //     provide: APOLLO_OPTIONS,
  //     // useFactory: setupApollo,
  //     // deps: [HttpLink, Store, HttpClient]
  //   },
  //   {
  //     // provide: NGXS_PLUGINS,
  //     // useValue: logoutPlugin,
  //     multi: true
  //   }
  // ]
  ,  bootstrap: [AppComponent]
})
export class AppModule {}

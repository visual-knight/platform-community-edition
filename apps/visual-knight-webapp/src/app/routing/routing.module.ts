import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import {AuthGuard} from '../auth/auth.guard';
import {AuthLoadGuard} from '../auth/auth-load.guard'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }

const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './sessions/sessions.module#SessionsModule',
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Dashboard', breadcrumb: '' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Projects', breadcrumb: '' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'test',
        loadChildren: './test/test.module#TestModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Tests', breadcrumb: '' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Users', breadcrumb: '' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'order',
        loadChildren: './order/order.module#OrderModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Users', breadcrumb: '' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
        canLoad: [AuthLoadGuard],
        data: { title: 'Users', breadcrumb: '' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];


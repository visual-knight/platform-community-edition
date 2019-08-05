import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthLoadGuard } from '../auth/auth-load.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren:  () => import('../sessions/sessions.module').then(m=>m.SessionsModule),
        data: { title: 'Session' }
      }

    //   loadChildren: './lazy/lazy.module#LazyModule', // use this syntax for non-ivy or Angular 7 and below
    // loadChildren : () => import('./lazy/lazy.module').then(m => m.LazyModule), // new dynamic import meth
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'project',
        loadChildren: () => import('../project/project.module').then(m=> m.ProjectModule),
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
        loadChildren:() => import('../test/test.module').then(m=> m.TestModule),
        canLoad: [AuthLoadGuard],
        data: { title: 'Tests', breadcrumb: '' }
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

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

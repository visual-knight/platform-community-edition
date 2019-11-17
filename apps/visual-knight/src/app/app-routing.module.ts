import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'project'
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'project',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'test',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)
  },
  {
    path: 'variation',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/variation/variation.module').then(m => m.VariationModule)
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

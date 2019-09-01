import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./modules/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./modules/test/test.module').then(m => m.TestModule)
  },
  {
    path: 'variation',
    loadChildren: () =>
      import('./modules/variation/variation.module').then(
        m => m.VariationModule
      )
  },
  {
    path: 'testsession',
    loadChildren: () =>
      import('./modules/test-session/test-session.module').then(
        m => m.TestSessionModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

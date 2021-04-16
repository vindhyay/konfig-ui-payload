import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
    data: {
      actions: []
    },
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

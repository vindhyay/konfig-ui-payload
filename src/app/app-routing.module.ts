import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './modules/shared/page-not-found/page-not-found.component';
import {PayloadDetailsComponent} from './modules/task/payload-details/payload-details.component';
import {QUEUE_TYPES} from './state/model/queue-types-model';
import {LoginComponent} from './modules/auth/components/login/login.component';

const routes: Routes = [
    {
    path: ':workflowId/auth',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: ':workflowId',
    component: PayloadDetailsComponent,
    pathMatch: 'full',
    data: {
      queueType: QUEUE_TYPES.NEW
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
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

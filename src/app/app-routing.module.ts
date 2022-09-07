import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadChildren: () => import('src/app/modules/list/list.module').then(m => m.ListModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('src/app/modules/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'management',
    loadChildren: () => import('src/app/modules/management/management.module').then(m => m.ManagementModule)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

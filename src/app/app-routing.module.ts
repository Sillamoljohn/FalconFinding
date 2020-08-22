import { FailComponent } from './fail/fail.component';
import { SuccessComponent } from './success/success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindFalconComponent } from './find-falcon/find-falcon.component';


const routes: Routes = [
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'fail',
    component: FailComponent,
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: FindFalconComponent,

  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    component: FindFalconComponent,

  },
  {
    path: 'find-falcon',
    component: FindFalconComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

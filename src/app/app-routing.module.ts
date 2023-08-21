import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './dashboard/employee-form/employee-form.component';
import { EmployeeListComponent } from './dashboard/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './dashboard/employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/registros',
    pathMatch: 'full'
  },
  {
    path: ':nome/registrar',
    component: EmployeeFormComponent
  },
  {
    path: 'registros',
    component: EmployeeListComponent
  },
  {
    path: ':nome/validar',
    component: EmployeeDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

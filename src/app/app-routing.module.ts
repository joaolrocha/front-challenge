import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './dashboard/employee-form/employee-form.component';
import { EmployeeListComponent } from './dashboard/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: ':nome/registrar',
    component: EmployeeFormComponent
  },

  {
    path: 'registros',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

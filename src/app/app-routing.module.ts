import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateComponent } from './components/candidate/candidate.component';
import { SalaryComponent } from './components/salary/salary.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';



const routes: Routes = [
  { path: 'candidate', component: CandidateComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'employee', component: EmployeeComponent,children: [
    { path: 'add', component: AddEmployeeComponent },
    {path:'list',component:EmployeeListComponent},
    {path:'update',component:UpdateEmployeeComponent} // Child route for Add Employee
  ], },
  { path: 'department', component: DepartmentComponent },
  { path: 'organization', component: OrganizationComponent },
  {path:'',component:HomeComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { httpClientInMemBackendServiceFactory, HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';




import { AppRoutingModule } from './app-routing.module';


import { CandidateComponent } from './components/candidate/candidate.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { SalaryComponent } from './components/salary/salary.component';
import { HighlightDirective } from './directives/highlight.directive';
// Importing Angular Material modules

import { MatHeaderRowDef, MatRowDef } from '@angular/material/table';


import { MatDividerModule } from '@angular/material/divider';





import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HrDataService } from './services/hr-data.service';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';

import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';




@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    OrganizationComponent,
    EmployeeComponent,
    DepartmentComponent,
    SalaryComponent,

    HighlightDirective,
    SidebarComponent,
    HomeComponent,
    AddEmployeeComponent,
    
    UpdateEmployeeComponent,
    EmployeeListComponent,
   
  ],
  imports: [
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(HrDataService),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

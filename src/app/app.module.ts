import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateComponent } from './candidate/candidate.component';
import { OrganizationComponent } from './organization/organization.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { SalaryComponent } from './salary/salary.component';
import { HighlightDirective } from './highlight.directive';
// Importing Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatHeaderRowDef, MatRowDef } from '@angular/material/table';


import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HrDataService } from './hr-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    OrganizationComponent,
    EmployeeComponent,
    DepartmentComponent,
    SalaryComponent,
    HighlightDirective
  ],
  imports: [
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(HrDataService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

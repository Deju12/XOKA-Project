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

import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';




import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HrDataService } from './hr-data.service';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';



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
   
  ],
  imports: [
    FormsModule,

    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(HrDataService),

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

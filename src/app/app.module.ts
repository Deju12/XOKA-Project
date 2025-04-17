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
import { MatAutocompleteModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatSelectModule, MatSortModule, MatTabsModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';

import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { OrganizationService } from './services/organization/organization.service';
import { DepartmentService } from './services/department/department.service';
import {ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { HighlightSalaryDirective } from './shared/highlight-salary.directive';



@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    OrganizationComponent,
    EmployeeComponent,
    DepartmentComponent,

    SidebarComponent,
    HomeComponent,
    AddEmployeeComponent,
    
    UpdateEmployeeComponent,
    EmployeeListComponent,
    ConfirmationDialog,
    MessageDialogComponent,
    HighlightSalaryDirective
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
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatAutocompleteModule,
    

  ],
  entryComponents: [ConfirmationDialog,MessageDialogComponent],
  providers: [OrganizationService,DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

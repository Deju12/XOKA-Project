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
<<<<<<< HEAD
=======
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

>>>>>>> 02ddfd1 (create a side bar)


import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HrDataService } from './hr-data.service';
<<<<<<< HEAD
=======
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

>>>>>>> 02ddfd1 (create a side bar)

@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    OrganizationComponent,
    EmployeeComponent,
    DepartmentComponent,
    SalaryComponent,
<<<<<<< HEAD
    HighlightDirective
  ],
  imports: [
=======
    HighlightDirective,
    SidebarComponent,
   
  ],
  imports: [
    FormsModule,
>>>>>>> 02ddfd1 (create a side bar)
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(HrDataService),
<<<<<<< HEAD
=======
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule

>>>>>>> 02ddfd1 (create a side bar)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

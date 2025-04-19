import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { Organization } from 'src/app/models/organization.model';
import { DepartmentService } from 'src/app/services/department/department.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee = {id:null, name: '', organizationId: 0, departmentId: 0, salary:null,candidateId:0 };
  newCandidate = { id: 0, name: '', email: '', phone: '', skills:[] };
  organizations: Organization[] = []; // List of organizations
  departments: Department[] = []; // List of departments
  employees: Employee[] = []; // List of all employees
  filteredEmployees: Employee[] = []; // Filtered employees for autocomplete

  constructor(
    private employeeService: EmployeeService,
    private organizationService: OrganizationService,
    private router: Router,
    private dialog: MatDialog,
    private departmentService: DepartmentService,
    private candidateService: CandidateService // Inject the CandidateService
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
    this.getDepartments();
   
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data; // Initialize filtered list
    }); // Fetch all employees
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(data => {
      this.organizations = data; // Populate the organizations array
    });
  }

  getDepartments(): void {
    this.departmentService.getDepartment().subscribe(data => {
      this.departments = data; // Populate the organizations array
    });
  }

  getAllEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data; // Initialize filtered list
    });
  }

  filterEmployees(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(filterValue)
    );
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Add Employee',
        message: 'Are you sure you want to add this employee?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(this.newEmployee).subscribe(() => {
          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Success',
              message: 'Employee added successfully!'
            }
          });
          this.resetEmployeeForm();
        });
      }
    });
  }

    addCandidate(): void {
     
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Add Candidate',
        message: 'Are you sure you want to add this candidate?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidateService.addCandidate(this.newCandidate).subscribe(() => {
          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Success',
              message: 'Candidate added successfully!'
            }
          });
          console.log('Candidate added:', this.newCandidate);
          console.log('Employee added:', this.newEmployee);
          this.resetCandidateForm();
        });
      }
    });
  }
  onEmployeeSelected(selectedEmployee: Employee): void {
    this.newCandidate.id = selectedEmployee.id; // Set candidate ID to the selected employee's ID
    this.newCandidate.name = selectedEmployee.name; // Update the candidate name
  }
  resetEmployeeForm(): void {
    this.newEmployee = { id:null, name: '', organizationId: 0, departmentId: 0, salary: null ,candidateId:0 };
  }

  resetCandidateForm(): void {
    this.newCandidate = {id:null, name: '', email: '', phone: '', skills: [] };
  }
}
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

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0 };
  newCandidate = { name: '', email: '', phone: '', skills: '' };
  organizations: Organization[] = []; // List of organizations
  departments: Department[] = []; // List of departments
  employees: Employee[] = []; // List of all employees
  filteredEmployees: Employee[] = []; // Filtered employees for autocomplete

  constructor(
    private employeeService: EmployeeService,
    private organizationService: OrganizationService,
    private router: Router,
    private dialog: MatDialog,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
    this.getDepartments();
    this.getAllEmployees(); // Fetch all employees
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(data => {
      this.organizations = data; // Populate the organizations array
    });
  }

  getDepartments(): void {
    this.departmentService.getDepartment().subscribe(data => {
      console.log('Departments fetched:', data);
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
    // Logic to handle adding a candidate
    alert('Candidate added successfully!');
    this.resetCandidateForm();
  }

  resetEmployeeForm(): void {
    this.newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0 };
  }

  resetCandidateForm(): void {
    this.newCandidate = { name: '', email: '', phone: '', skills: '' };
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { Organization } from 'src/app/models/organization.model';
import { DepartmentService } from 'src/app/services/department/department.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0 };
  organizations: Organization[] = []; // List of organizations
  departments: Department[] = []; // List of departments
  constructor(
    private employeeService: EmployeeService,
    private organizationService: OrganizationService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
    this.getDepartments();
    this.generateEmployeeId();
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

  generateEmployeeId(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.newEmployee.id = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1; // Auto-generate ID
    });
  }

  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.organizationId && this.newEmployee.departmentId && this.newEmployee.salary) {
      this.employeeService.addEmployee(this.newEmployee).subscribe(() => {
        alert('Employee added successfully!');
        this.resetForm();
      });
    } else {
      alert('Please fill in all fields before adding an employee.');
    }
  }

  resetForm(): void {
    this.newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0 };
    this.generateEmployeeId(); // Generate a new ID for the next employee
  }
}
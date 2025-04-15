import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'organizationId', 'departmentId', 'salary'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  organizations: any[] = [];
  departments: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadLookups();
    this.getEmployees();
  }

  loadLookups(): void {
    this.employeeService.getOrganizations().subscribe(data => (this.organizations = data));
    this.employeeService.getDepartments().subscribe(data => (this.departments = data));
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  getOrganizationName(id: number): string {
    const org = this.organizations.find(org => org.id === id);
    return org ? org.name : 'N/A';
  }

  getDepartmentName(id: number): string {
    const dept = this.departments.find(dept => dept.id === id);
    return dept ? dept.name : 'N/A';
  }

  onRowClick(employee: Employee): void {
    this.router.navigate(['/employee/update'], { queryParams: { id: employee.id } });
  }
  
}
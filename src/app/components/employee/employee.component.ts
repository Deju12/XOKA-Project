import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'organizationId', 'departmentId', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  newEmployee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0, candidateId: 0 };
  selectedEmployee: Employee | null = null; // For editing or viewing details
  currentView: 'list' | 'add' | 'edit' | 'details' = 'list'; // Tracks the current view

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data; // Bind the data to the table
    });
  }

 
}

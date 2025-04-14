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
  displayedColumns: string[] = ['id', 'name', 'organizationId', 'departmentId', 'salaryId', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  newEmployee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 };
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

  showAddForm(): void {
    this.currentView = 'add';
    this.newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 }; // Reset the form
  }

  showEditForm(employee: Employee): void {
    this.currentView = 'edit';
    this.newEmployee = { ...employee }; // Populate the form with the selected employee's data
  }

  showDetails(employee: Employee): void {
    this.currentView = 'details';
    this.selectedEmployee = employee; // Set the selected employee for details view
  }

  goBackToList(): void {
    this.currentView = 'list';
    this.selectedEmployee = null;
  }

  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.organizationId && this.newEmployee.departmentId && this.newEmployee.salaryId) {
      this.employeeService.addEmployee(this.newEmployee).subscribe(emp => {
        this.dataSource.data = [...this.dataSource.data, emp]; // Add the new employee to the table
        this.goBackToList(); // Return to the list view
      });
    } else {
      alert('Please fill in all fields before adding an employee.');
    }
  }

  editEmployee(): void {
    this.employeeService.updateEmployee(this.newEmployee).subscribe(updatedEmployee => {
      const index = this.dataSource.data.findIndex(e => e.id === updatedEmployee.id);
      if (index !== -1) {
        this.dataSource.data[index] = updatedEmployee; // Update the employee in the table
        this.dataSource.data = [...this.dataSource.data]; // Refresh the table
      }
      this.goBackToList(); // Return to the list view
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(e => e.id !== id); // Update the table data
    });
  }
}

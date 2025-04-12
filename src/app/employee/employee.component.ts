import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
>>>>>>> 02ddfd1 (create a side bar)

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
<<<<<<< HEAD

  constructor() { }

  ngOnInit() {
  }

=======
  employees: Employee[] = [];
  newEmployee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe(emp => {
      this.employees.push(emp);
      this.newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 };
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== id);
    });
  }

  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe();
  }
>>>>>>> 02ddfd1 (create a side bar)
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  newEmployee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 };
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.newEmployee.id = employees.length + 1;
    });
  }
  constructor(private employeeService: EmployeeService, private router: Router) {}

  addEmployee(): void {
    if (this.newEmployee.id &&this.newEmployee.name && this.newEmployee.organizationId && this.newEmployee.departmentId && this.newEmployee.salaryId) {
      this.employeeService.addEmployee(this.newEmployee).subscribe(() => {
        this.newEmployee = { id: 0, name: '', organizationId: 0, departmentId: 0, salaryId: 0 };
        this.router.navigate(['/employee/list']); // Navigate back to the employee list
      });
    } else {
      alert('Please fill in all fields before adding an employee.');
    }
  }
  

}
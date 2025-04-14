import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class HrDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 1, name: 'John Doe', organizationId: 1, departmentId: 1, salaryId: 1 },
      { id: 2, name: 'Jane Smith', organizationId: 2, departmentId: 2, salaryId: 2 }
    ];
    const organizations = [
      { id: 1, name: 'Tech Corp' },
      { id: 2, name: 'HR Solutions' }
    ];
    const departments = [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' }
    ];
    const salaries = [
      { id: 1, amount: 50000 },
      { id: 2, amount: 45000 }
    ];
    return { employees, organizations, departments, salaries };
  }

  // Generate a unique ID for employees
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
  }
}

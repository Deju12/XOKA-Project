import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrDataService implements InMemoryDbService {

  createDb() {
    const candidates = [
      { id: 1, name: 'John Doe', position: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', position: 'HR Manager' }
    ];

    const organizations = [
      { id: 1, name: 'Tech Corp' },
      { id: 2, name: 'HR Solutions' }
    ];

    const employees = [
      { id: 1, name: 'John Doe', organizationId: 1, departmentId: 1, salaryId: 1 },
      { id: 2, name: 'Jane Smith', organizationId: 2, departmentId: 2, salaryId: 2 }
    ];

    const departments = [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' }
    ];

    const salaries = [
      { id: 1, amount: 50000 },
      { id: 2, amount: 45000 }
    ];

    return { candidates, organizations, employees, departments, salaries };
  }
}

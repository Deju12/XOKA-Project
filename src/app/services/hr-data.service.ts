import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class HrDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 1, name: 'Kebede Alemu', organizationId: 1, departmentId: 1, salary: 45000 },
      { id: 2, name: 'Lily Tadesse', organizationId: 2, departmentId: 2, salary: 25000 },
      { id: 3, name: 'Mulugeta Bekele', organizationId: 3, departmentId: 3, salary: 11000 },
      { id: 4, name: 'Selamawit Degu', organizationId: 4, departmentId: 4, salary: 5000 }
    ];
    
    const organizations = [
      { id: 1, name: 'Tech Corp', description: 'Technology Solutions' },
      { id: 2, name: 'HR Solutions', description: 'Human Resource Management' },
      { id: 3, name: 'FinServe Ltd' ,description: 'Financial Services' },
      { id: 4, name: 'MarketMinds Inc',description: 'Marketing and Sales' }
    ];
    
    const departments = [
      { id: 1, name: 'IT',description: 'Information Technology' },
      { id: 2, name: 'HR',description: 'Human Resources' },
      { id: 3, name: 'Finance' ,description: 'Financial Services' },
      { id: 4, name: 'Marketing' ,description: 'Marketing and Sales' }
    ];
    
    const salaries = [
      { id: 1, amount: 50000 },
      { id: 2, amount: 45000 },
      { id: 3, amount: 11000 },
      { id: 4, amount: 5000 }
    ];
    
    const candidates = [
      {
        id: 1,
        email: 'dejene.tesfaye@example.com',
        phone: '0911123456',
        skills: ['Angular', 'TypeScript', 'HTML'],
        status: 'Applied'
      },
      {
        id: 2,
        email: 'liya.abebe@example.com',
        phone: '0911987654',
        skills: ['React', 'CSS', 'JavaScript'],
        status: 'Interviewed'
      },
      {
        id: 3,
        email: 'mekdes.h@example.com',
        phone: '0922334455',
        skills: ['Python', 'Django', 'SQL'],
        status: 'Shortlisted'
      },
      {
        id: 4,
        email: 'samuel.mekonnen@example.com',
        phone: '0933445566',
        skills: ['Java', 'Spring Boot'],
        status: 'Rejected'
      },
     
    ];
    
    return { employees, organizations, departments, salaries,candidates };
  }

  // Generate a unique ID for employees
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
  }
}

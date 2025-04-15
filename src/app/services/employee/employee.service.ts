import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Organization } from 'src/app/models/organization.model';
 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/employees'; // In-memory API endpoint
  private orgUrl = 'api/organizations'; // API endpoint for organizations
  private employeeData!: Employee;

  constructor(private http: HttpClient) {}

  setEmployee(employee: Employee) {
    this.employeeData = employee;
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`/api/employees/${employee.id}`, employee);
  }
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`/api/employees/${id}`);
  }
  
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.orgUrl); // 🔥 Add this method
  }
  
  getDepartments() {
    return this.http.get<any[]>('/api/departments');
  }
  
  getSalaries() {
    return this.http.get<any[]>('/api/salaries');
  }
  
}

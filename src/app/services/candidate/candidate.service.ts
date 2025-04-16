import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Organization } from 'src/app/models/organization.model';
 

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'api/employees'; // In-memory API endpoint
  private orgUrl = 'api/organizations'; // API endpoint for organizations
  private employeeData!: Employee;

  constructor(private http: HttpClient) {}


  getCandidateById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }
  getCandidate(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addCandidate(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateCandidate(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`/api/employees/${employee.id}`, employee);
  }
  
  deleteCandidate(id: number): Observable<any> {
    return this.http.delete(`/api/employees/${id}`);
  }
  
 
}

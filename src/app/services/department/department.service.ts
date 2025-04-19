import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
   private apiUrl = 'api/departments'; // In-memory API endpoint
  
    constructor(private http: HttpClient) {}
  
    getDepartment(): Observable<Department[]> {
      return this.http.get<Department[]>(this.apiUrl);
    }

    addDepartment(department: Department): Observable<Department> {
      return this.http.post<Department>(this.apiUrl, department);
    }
    updateDepartment(department: Department): Observable<Department> {
      return this.http.put<Department>(`${this.apiUrl}/${department.id}`, department);
    }
    deleteDepartment(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

}

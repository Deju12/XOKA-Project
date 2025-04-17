import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Candidate } from 'src/app/models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'api/candidates'; // API endpoint for candidates

  constructor(private http: HttpClient) {}

  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`/api/candidates/${id}`);
  }

  getCandidate(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  getCandidateByEmployeeId(employeeId: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}?employeeId=${employeeId}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${candidate.id}`, candidate);
  }

  deleteCandidate(id: number): Observable<any> {
    return this.http.delete(`/api/employees/${id}`);
  }

  deleteCandidateByEmployeeId(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?employeeId=${employeeId}`);
  }
}

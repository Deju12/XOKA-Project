import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'api/organizations'; // In-memory API endpoint

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl);
  }
  addOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.apiUrl, organization);
  }
  updateOrganization(organization: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${organization.id}`, organization);
  }
  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

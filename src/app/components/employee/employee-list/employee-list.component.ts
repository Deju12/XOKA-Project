import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { HrDataService } from 'src/app/services/hr-data.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'organizationId', 'departmentId','salary','phone','email','skills'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator; // Link the paginator to the dataSource
}
  organizations: any[] = [];
  departments: any[] = [];
  candidates: any[] = [];
  employeesWithCandidate: any[] = [];
  constructor(private employeeService: EmployeeService,
    private hrDataService: HrDataService,
    private router: Router,
) {}
  
  ngOnInit(): void {
    this.loadLookups();
    this.getEmployees();
   


    
  
  }
    
  loadLookups(): void {
    this.employeeService.getOrganizations().subscribe(data => (this.organizations = data));
    this.employeeService.getDepartments().subscribe(data => (this.departments = data));
    this.employeeService.getCandidates().subscribe(data => (this.candidates = data));
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      
    });
    
  }
  

  getOrganizationName(id: number): string {
    const org = this.organizations.find(org => org.id === id);
    return org ? org.name : 'N/A';
  }
  getCandidateSkills(id: number): string {
    const candidate = this.candidates.find(candidate => candidate.id === id);
    return candidate ? candidate.skills : 'N/A';
  }

  getDepartmentName(id: number): string {
    const dept = this.departments.find(dept => dept.id === id);
    return dept ? dept.name : 'N/A';
  }

  onRowClick(employee: Employee): void {
    this.router.navigate(['/employee/update'], { queryParams: { id: employee.id } });
  }
  getSkills(employeeId: number): string {
    const candidate = this.candidates.find(candidate => candidate.id === employeeId);
    return candidate ? candidate.skills : 'N/A';
  }
  getEmail(employeeId: number): string {
    const candidate = this.candidates.find(candidate => candidate.id === employeeId);
    return candidate ? candidate.email : 'N/A';
  }
  getPhone(employeeId: number): string {
    const candidate = this.candidates.find(candidate => candidate.id === employeeId);
    return candidate ? candidate.phone : 'N/A';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const organizationName = this.getOrganizationName(data.organizationId).toLowerCase();
      const departmentName = this.getDepartmentName(data.departmentId).toLowerCase();
      const candidateSkills = this.getCandidateSkills(data.candidateId).toLowerCase();
      const candidateEmail = this.getEmail(data.candidateId).toLowerCase();
      const candidatePhone = this.getPhone(data.candidateId).toLowerCase();

      return organizationName.includes(filter) ||
            departmentName.includes(filter)|| 
            data.name.toLowerCase().includes(filter) ||
            data.salary.toString().includes(filter)||
            candidateSkills.includes(filter) ||
            candidateEmail.includes(filter) ||
            candidatePhone.includes(filter)
       
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
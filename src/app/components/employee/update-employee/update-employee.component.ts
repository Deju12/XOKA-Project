import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { Candidate } from 'src/app/models/candidate.model'; // Import Candidate model
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service'; // Import CandidateService
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0, candidateId: 0 };
  candidate: Candidate = { id: 0, name: '', email: '', phone: '', skills: [] }; 
  organizations: any[] = [];
  departments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private candidateService: CandidateService, // Inject CandidateService
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getEmployeeById(id);
        this.getCandidateById(id); // Fetch candidate details
      }
    });
    this.getOrganizations();
    this.getDepartments();
  }

  getOrganizations(): void {
    this.employeeService.getOrganizations().subscribe(data => {
      this.organizations = data;
    });
  }

  getDepartments(): void {
    this.employeeService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      data => {
        this.employee = data;
      },
      error => {
        console.error('Failed to fetch employee by ID:', error);
      }
    );
  }

  getCandidateById(id: number): void {
    this.candidateService.getCandidateById(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.error('Failed to fetch candidate by Employee ID:', error);
      }
    );
  }

  updateEmployee(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Update',
        message: 'Are you sure you want to update this employee and their candidate?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.employee.id) {
          // Update employee
          this.employeeService.updateEmployee(this.employee).subscribe(() => {
            console.log('Employee updated successfully!');
          });


          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Success',
              message: 'Employee and candidate updated successfully!'
            }
          });
          this.router.navigate(['/employee/list']);
        } else {
          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Error',
              message: 'Please select an employee to update.'
            }
          });
        }
      }
    });
  }

  deleteEmployee(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee and their associated candidate? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.employee.id) {
          // Delete employee
          this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
            console.log('Employee deleted successfully!');
          });

          // Delete associated candidate
          this.candidateService.deleteCandidateByEmployeeId(this.employee.id).subscribe(() => {
            console.log('Candidate deleted successfully!');
          });

          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Success',
              message: 'Employee and candidate deleted successfully!'
            }
          });
          this.router.navigate(['/employee/list']);
        } else {
          this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Error',
              message: 'Please select an employee to delete.'
            }
          });
        }
      }
    });
  }
}

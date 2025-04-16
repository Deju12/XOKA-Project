import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = { id: 0, name: '', organizationId: 0, departmentId: 0, salary: 0 };
  organizations: any[] = [];
  departments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getEmployeeById(id);
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

  updateEmployee(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Update',
        message: 'Are you sure you want to update this employee?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.employee.id) {
          this.employeeService.updateEmployee(this.employee).subscribe(() => {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Employee updated successfully!'
              }
            });
            this.router.navigate(['/employee/list']);
          });
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
        message: 'Are you sure you want to delete this employee? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.employee.id) {
          this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Employee deleted successfully!'
              }
            });
            this.router.navigate(['/employee/list']);
          });
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

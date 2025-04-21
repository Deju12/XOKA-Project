import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTabGroup, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department/department.service';
import { HrDataService } from 'src/app/services/hr-data.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  newDepartment = { id: null, name: '', description: '' };
  departments:Department[] = []; // List of departments
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<any>();
  department: Department = { id: 0, name: '', description: '' };
  // MatPaginator to handle pagination
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   @ViewChild(MatTabGroup,{ static: true }) tabGroup!: MatTabGroup;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Link the paginator to the dataSource
  }
  
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.getDepartment();
  }

  getDepartment(): void {
    this.departmentService.getDepartment().subscribe(data => {
      this.dataSource.data = data;
      
    });
    
  }
   addDepartment(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Add Department',
          message: 'Are you sure you want to add this Department?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.departmentService.addDepartment(this.newDepartment).subscribe(() => {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Employee added successfully!'
              }
            });
            this.resetDepartmentForm();
            this.getDepartment(); // Refresh the Department list
             // Refresh the Department list
          });
        }
      });
    }
    updateDepartment(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Update',
          message: 'Are you sure you want to update this Department?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.department.id) {
            // Update employee
            this.departmentService.updateDepartment(this.department).subscribe(() => {
              console.log('Department updated successfully!');
            });
  
  
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Department updated successfully!'
              }
            });
            this.resetDepartmentForm();
            this.getDepartment();
            this.router.navigate([this.tabGroup.selectedIndex= 1]);
          } else {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Error',
                message: 'Please select an Department to update.'
              }
            });
          }
        }
      });
    }
    deleteDepartment(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this Department.'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.department.id) {
            // Delete Department
            this.departmentService.deleteDepartment(this.department.id).subscribe(() => {
              console.log('Department deleted successfully!');
            });

  
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Department deleted successfully!'
              }
            });
            this.resetDepartmentForm();
            this.getDepartment();
            this.router.navigate([this.tabGroup.selectedIndex= 1]);
          } else {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Error',
                message: 'Please select an Department to delete.'
              }
            });
          }
        }
      });
    }
    resetDepartmentForm(): void {
      this.newDepartment = { id:null, name: '', description: '' };
    }

    resetUpdateForm(): void {
      console.log('Resetting update form...');
      this.department = { id: null, name: '', description: '' };
      this.cdr.detectChanges(); // Trigger change detection to update the view
    }

    onRowClick(department: Department): void {
      this.department=department;
      
        this.router.navigate([this.tabGroup.selectedIndex= 3], { queryParams: { id: department.id } });
      }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value; 
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
}

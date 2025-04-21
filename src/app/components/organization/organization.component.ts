import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTabGroup, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { HrDataService } from 'src/app/services/hr-data.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
newOrganization = { id: null, name: '', description: '' };
  organizations:Organization[] = []; // List of organizationS
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<any>();
  organization: Organization = { id: 0, name: '', description: '' };
  // MatPaginator to handle pagination
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
   @ViewChild(MatTabGroup,{ static: true }) tabGroup!: MatTabGroup;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Link the paginator to the dataSource
  }

  constructor(
    private OrganizationService: OrganizationService,
    private router: Router,
    private dialog: MatDialog,
    private hrDataService: HrDataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getOrganization();
  }

  getOrganization(): void {
    this.OrganizationService.getOrganizations().subscribe(data => {
      this.dataSource.data = data;
      
    });
    
  }
   addOrganization(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Add Organization',
          message: 'Are you sure you want to add this Organization?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.OrganizationService.addOrganization(this.newOrganization).subscribe(() => {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Organization added successfully!'
              }
            });
            this.resetOrganizationForm();
             // Refresh the Department list
          });
        }
      });
    }
    updateOrganization(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Update',
          message: 'Are you sure you want to update this Organization?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.organization.id) {
            // Update employee
            this.OrganizationService.updateOrganization(this.organization).subscribe(() => {
              console.log('Organization updated successfully!');
            });
  
  
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Organization updated successfully!'
              }
            });
            this.resetUpdateForm();
            this.getOrganization();
            this.tabGroup.selectedIndex = 1;
            
          } else {
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Error',
                message: 'Please select an Organization to update.'
              }
            });
          }
        }
      });
    }
    deleteOrganization(): void {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this Organization.?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.organization.id) {
            // Delete Organization
            this.OrganizationService.deleteOrganization(this.organization.id).subscribe(() => {
              console.log('Organization deleted successfully!');
              this.resetUpdateForm();
            });

  
            this.dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                message: 'Organization deleted successfully!'
              }
            });
            this.resetUpdateForm();
            this.getOrganization();
            this.tabGroup.selectedIndex=1;
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
    resetUpdateForm(): void {
      console.log('Resetting update form...');
      this.organization = { id: null, name: '', description: '' };
      this.cdr.detectChanges(); // Trigger change detection to update the view
    }
    resetOrganizationForm(): void {
      this.newOrganization = { id:null, name: '', description: '' };
    }

    onRowClick(organization: Organization): void {
      this.organization=organization;
      
        this.tabGroup.selectedIndex= 2, { queryParams: { id: organization.id } };
      }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value; 
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  

}

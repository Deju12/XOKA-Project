import { Component, OnInit } from '@angular/core';
import { HrDataService } from '../../services/hr-data.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position'];
  dataSource = new MatTableDataSource();

  constructor(
     private hrDataService: HrDataService,
     private candidateService: CandidateService,
     private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('api/candidates').subscribe(data => {
      this.dataSource.data = data;
    });
  }


  getCandidates(): void {
    this.candidateService.getCandidate().subscribe(data => {
      this.dataSource.data = data; // Bind the data to the table
    });
  }
}

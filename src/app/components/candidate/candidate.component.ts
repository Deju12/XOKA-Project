import { Component, OnInit } from '@angular/core';
import { HrDataService } from '../../services/hr-data.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position'];
  dataSource = new MatTableDataSource();

  constructor(private hrDataService: HrDataService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('api/candidates').subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Candidate } from 'src/app/models/candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
   displayedColumns: string[] = ['id', 'name', 'organizationId', 'departmentId', 'salary'];
    dataSource = new MatTableDataSource<Candidate>();

  constructor() { }

  ngOnInit() {
  }

}

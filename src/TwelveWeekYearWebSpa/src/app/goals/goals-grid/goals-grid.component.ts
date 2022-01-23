import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss'],
})
export class GoalsGridComponent implements OnInit {
  @Input() goals!: Goal[];

  displayedColumns: string[] = ['id', 'description', 'type'];
  dataSource = new MatTableDataSource<Goal>();

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.goals;
  }
}

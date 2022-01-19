import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss'],
})
export class GoalsGridComponent implements OnInit {
  data$!: Observable<Goal[]>;
  displayedColumns: string[] = ['id', 'description'];
  dataSource = new MatTableDataSource<Goal>();

  constructor(private service: GoalsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getGoals();

    this.data$.subscribe((x) => {
      this.dataSource.data = x;
    });
  }
}

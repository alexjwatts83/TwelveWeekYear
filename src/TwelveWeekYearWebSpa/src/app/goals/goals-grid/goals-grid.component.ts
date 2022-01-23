import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal, GoalTypes } from '../models/goal';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss'],
})
export class GoalsGridComponent implements OnInit {
  // @Input() goals!: Goal[];
  @Input() goalType: GoalTypes = GoalTypes.None;

  displayedColumns: string[] = ['id', 'description', 'type'];
  dataSource = new MatTableDataSource<Goal>();

  data$!: Observable<Goal[]>;
  
  constructor(private service: GoalsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getGoals(this.goalType);

    this.data$.subscribe((x) => {
      // console.log({x, goalType: this.goalType, title: this.title});
      // this.goals = x;
      this.dataSource.data = x;
    });

  }
}

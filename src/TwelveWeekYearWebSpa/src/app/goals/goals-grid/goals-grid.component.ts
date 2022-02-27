import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal, GoalTypes } from '../models';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss'],
})
export class GoalsGridComponent implements OnInit {
  @Input() goalType: GoalTypes = GoalTypes.None;

  displayedColumns: string[] = ['id', 'description', 'type'];
  dataSource = new MatTableDataSource<Goal>();
  data$!: Observable<Goal[]>;
  
  constructor(private service: GoalsService) { 
    this.displayedColumns = ['description'];
  }

  ngOnInit(): void {
    if (this.goalType == null)  {
      this.goalType = GoalTypes.TwelveWeekYear
    }
    this.data$ = this.service.getGoals(this.goalType);

    this.data$.subscribe((x) => {
      this.dataSource.data = x;
      // console.log({x});
    });
  }
}

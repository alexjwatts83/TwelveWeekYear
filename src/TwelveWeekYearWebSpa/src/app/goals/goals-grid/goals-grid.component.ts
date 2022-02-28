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
  @Input() goalType!: GoalTypes;;

  displayedColumns: string[] = ['id', 'description', 'type'];
  dataSource = new MatTableDataSource<Goal>();
  data$!: Observable<Goal[]>;
  heading!: string;
  
  constructor(private service: GoalsService) { 
    this.displayedColumns = ['description'];
  }

  ngOnInit(): void {
    console.log({goalType: this.goalType, isNull: this.goalType == null});
    if (this.goalType == null)  {
      this.goalType = GoalTypes.TwelveWeekYear
      this.heading = 'Twelve Week Year Goals';
    }
    console.log({goalType: this.goalType});
    this.data$ = this.service.getGoals(this.goalType);

    this.data$.subscribe((x) => {
      this.dataSource.data = x;
    });
  }
}

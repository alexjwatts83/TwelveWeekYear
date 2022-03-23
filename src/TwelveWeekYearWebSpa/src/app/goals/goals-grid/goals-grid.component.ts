import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal, GoalTypes } from '../models';

@Component({
  selector: 'app-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss'],
})
export class GoalsGridComponent implements OnInit {
  @Input() goalType!: GoalTypes;

  displayedColumns: string[] = ['id', 'description', 'type'];
  dataSource = new MatTableDataSource<Goal>();
  data$!: Observable<Goal[]>;
  heading!: string;

  constructor(private service: GoalsService, private router: Router) {
    this.displayedColumns = ['description'];
  }

  ngOnInit(): void {
    if (this.goalType == null) {
      this.goalType = GoalTypes.TwelveWeekYear;
      this.heading = 'Twelve Week Year Goals';
      switch (this.router.url) {
        case '/goals/three-to-five-year': {
          this.goalType = GoalTypes.ThreeToFiveYear;
          this.heading = 'Three To Five Year Goals';
          break;
        }
        case '/goals/this-year': {
          this.goalType = GoalTypes.ThisYear;
          this.heading = 'This Year Goals';
          break;
        }
      }
    }

    this.data$ = this.service.getGoals(this.goalType);

    this.data$.subscribe((x) => {
      this.dataSource.data = x;
    });
  }
}

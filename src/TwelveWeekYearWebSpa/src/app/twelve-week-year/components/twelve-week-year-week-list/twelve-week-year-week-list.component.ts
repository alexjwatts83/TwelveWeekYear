import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GoalsService } from 'src/app/goals/goals.service';
import { Goal, GoalTypes } from 'src/app/goals/models/goal';
import { Week, WeekDay } from '../twelve-week-year/twelve-week-year.component';

@Component({
  selector: 'app-twelve-week-year-week-list',
  templateUrl: './twelve-week-year-week-list.component.html',
  styleUrls: ['./twelve-week-year-week-list.component.scss']
})
export class TwelveWeekYearWeekListComponent implements OnInit {
  @Input() days: WeekDay[] = [];

  displayedColumns: string[] = ['date', 'comments'];
  // dataSource = new MatTableDataSource<Goal>();
  // data$!: Observable<Goal[]>;
  
  constructor(private service: GoalsService) { }

  ngOnInit(): void {
    // this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);

    // this.data$.subscribe((x) => {
    //   this.dataSource.data = x;
    //   console.log({x});
    // });
  }

}

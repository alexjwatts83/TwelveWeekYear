import { Component, Input, OnInit } from '@angular/core';
import { GoalsService } from 'src/app/goals/goals.service';
import { WeekDay } from "../../models";

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

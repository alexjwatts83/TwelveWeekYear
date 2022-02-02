import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalsService } from 'src/app/goals/goals.service';
import { Goal, GoalTypes } from 'src/app/goals/models';
import { Week } from '../../models';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  weeks: Week[] = [];

  data$!: Observable<Goal[]>;
  twelveWeekYearGoals: Goal[] = [];
  constructor(private service: GoalsService) {
    this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
  }
  ngOnInit(): void {
    this.data$.subscribe((x) => {
      this.twelveWeekYearGoals = x;
      this.init();
    });
  }

  private init() {
    let date = new Date();
    for (let i = 0; i < 12; i++) {
      date = this.addDays(date, 7);
      this.weeks.push({
        number: i + 1,
        date: date,
        days: [],
        taskComments: [],
      });

      for (let j = 0; j < 7; j++) {
        let dayDate = this.addDays(date, j);
        this.weeks[this.weeks.length - 1].days.push({
          date: dayDate,
          comments: ``,
        });
      }

      this.twelveWeekYearGoals.forEach((x) => {
        x.tasks.forEach((t) => {
          this.weeks[this.weeks.length - 1].taskComments.push({
            taskId: t.id,
            comments: [
              {
                date: date,
                comment: `${t.description} - 1`
              },
              {
                date: date,
                comment: `2 - ${t.description}`
              },
              {
                date: date,
                comment: `Rando`
              } 
            ],
          });
        });
      });
    }
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalsService } from 'src/app/goals/goals.service';
import { Goal, GoalTypes } from 'src/app/goals/models';
import { Week, WeekDayResult } from '../../models';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  weeks: Week[] = [];
  taskResults: WeekDayResult[] = [];
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
          this.weeks.forEach(w => {
            w.days.forEach(d => {
              if (t.subTasks.length === 0) {
                let taskResult: WeekDayResult = {
                  taskId: t.id,
                  date: d.date,
                  completed: this.isOdd(this.getRandomInt(1, 1000)),
                  subTaskId: null
                };
                this.taskResults.push(taskResult);
              } else {
                t.subTasks.forEach(sb => {
                  let taskResult: WeekDayResult = {
                    taskId: null,
                    date: d.date,
                    completed: this.isOdd(this.getRandomInt(1, 1000)),
                    subTaskId: sb.id
                  };
                  this.taskResults.push(taskResult);
                });
              }
            });
          });
        });
      });

      console.log({taskResults: this.taskResults});
    }
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  private isOdd(num: number) { return (num % 2) == 1;}
}

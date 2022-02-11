import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalsService } from '../goals/goals.service';
import { Goal, GoalTypes } from '../goals/models';
import { Week, WeekDayResult } from './models';

export interface TwelveWeekYearData {
  goals: Goal[],
  weeks: Week[],
  taskResults: WeekDayResult[]
}

@Injectable({
  providedIn: 'root',
})
export class TwelveWeekYearService {
  private weeks: Week[] = [];
  private taskResults: WeekDayResult[] = [];
  private taskResults$!: Observable<WeekDayResult[]>;
  private data$: Observable<Goal[]>;
  private twelveWeekYearGoals!: Goal[];
  // private data!: Goal[];
  private _goals$ = new BehaviorSubject<Goal[]>(this.twelveWeekYearGoals);
  private weekOneFirstGoalId = '';

  constructor(private service: GoalsService) {
    console.log({constructor: 'TwelveWeekYearService'});
    this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
    this.data$.subscribe((x) => {
      this.twelveWeekYearGoals = x;
      this.taskResults$ = this.init();
    });
  }

  getTwelveWeekData(): Observable<Goal[]> {
    // console.log({ goalType });
    return this._goals$
      .asObservable()
      .pipe(
        map((data) => data.filter((workorder) => workorder.type === GoalTypes.TwelveWeekYear))
      );
  }

  private init(): Observable<WeekDayResult[]> {
    console.log({init: 'TwelveWeekYearService'});
    let date = new Date();
    const weeksCount = 1;
    const daysCount = 3;
    for (let i = 0; i < weeksCount; i++) {
      date = this.addDays(date, 7);
      this.weeks.push({
        number: i + 1,
        date: date,
        days: [],
      });

      for (let j = 0; j < daysCount; j++) {
        let dayDate = this.addDays(date, j);
        this.weeks[this.weeks.length - 1].days.push({
          date: dayDate,
          comments: ``,
        });
      }

      this.twelveWeekYearGoals.forEach((x) => {
        x.tasks.forEach((t) => {
          this.weeks.forEach((w) => {
            w.days.forEach((d) => {
              if (t.subTasks.length === 0) {
                let taskResult: WeekDayResult = {
                  weekNumber: w.number,
                  goalId: x.id,
                  taskId: t.id,
                  date: d.date,
                  completed: this.isOdd(this.getRandomInt(1, 100)),
                  subTaskId: null,
                };
                this.taskResults.push(taskResult);
              } else {
                t.subTasks.forEach((sb) => {
                  let taskResult: WeekDayResult = {
                    weekNumber: w.number,
                    goalId: x.id,
                    taskId: t.id,
                    date: d.date,
                    completed: this.isOdd(this.getRandomInt(1, 100)),
                    subTaskId: sb.id,
                  };
                  this.taskResults.push(taskResult);
                });
              }
            });
          });
        });
      });

      // console.log({taskResults: this.taskResults});
    }
    this.weekOneFirstGoalId = this.twelveWeekYearGoals[0].id;

    return of(this.taskResults);
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private isOdd(num: number) {
    return num % 2 == 1;
  }
}

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
  // private weeks: Week[] = [];
  // private taskResults: WeekDayResult[] = [];
  // private taskResults$!: Observable<WeekDayResult[]>;
  private data$: Observable<Goal[]>;
  // private twelveWeekYearGoals!: Goal[];
  private twelveWeekYearData: TwelveWeekYearData = {
    goals: [],
    taskResults: [],
    weeks: []
  }
  private _goals$ = new BehaviorSubject<TwelveWeekYearData>(this.twelveWeekYearData);
  private weekOneFirstGoalId = '';

  constructor(private service: GoalsService) {
    console.log({constructor: 'TwelveWeekYearService'});
    this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
    this.data$.subscribe((x) => {
      this.setGoals(x);
      // console.log({twelveWeekYearGoals: this.twelveWeekYearGoals});
      this.init(x);
    });
  }

  private setGoals(goals: Goal[]) {
    this.twelveWeekYearData.goals = goals;
    this._goals$.next(this.twelveWeekYearData);
  }

  private setWeeks(weeks: Week[]) {
    this.twelveWeekYearData.weeks = weeks;
    this._goals$.next(this.twelveWeekYearData);
  }

  private setTaskResults(taskResults: WeekDayResult[]) {
    this.twelveWeekYearData.taskResults = taskResults;
    this._goals$.next(this.twelveWeekYearData);
  }

  getTwelveWeekData(): Observable<TwelveWeekYearData> {
    // console.log({ goalType });
    return this._goals$
      .asObservable();
      // .pipe(
      //   map((data) => data.filter((workorder) => workorder.type === GoalTypes.TwelveWeekYear))
      // );
  }

  private init(goals: Goal[]) {
    console.log({init: 'TwelveWeekYearService'});
    let date = new Date();
    const weeksCount = 1;
    const daysCount = 3;
    let weeks: Week[] = [];
    let taskResults: WeekDayResult[] = [];

    for (let i = 0; i < weeksCount; i++) {
      date = this.addDays(date, 7);
      weeks.push({
        number: i + 1,
        date: date,
        days: [],
      });

      for (let j = 0; j < daysCount; j++) {
        let dayDate = this.addDays(date, j);
        weeks[weeks.length - 1].days.push({
          date: dayDate,
          comments: ``,
        });
      }

      goals.forEach((x) => {
        x.tasks.forEach((t) => {
          weeks.forEach((w) => {
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
                taskResults.push(taskResult);
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
                  taskResults.push(taskResult);
                });
              }
            });
          });
        });
      });

      // console.log({taskResults: this.taskResults});
    }
    this.weekOneFirstGoalId = this.twelveWeekYearData.goals[0].id;

    this.setWeeks(weeks);
    this.setTaskResults(taskResults);
    // return of(this.taskResults);
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

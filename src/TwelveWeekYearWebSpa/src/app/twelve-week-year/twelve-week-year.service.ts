import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { GoalsService } from '../goals/goals.service';
import { Goal, GoalTypes } from '../goals/models';
import { Week, WeekDayResult } from './models';

export interface TwelveWeekYearData {
  goals: Goal[];
  weeks: Week[];
  taskResults: WeekDayResult[];
}

enum Days {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}

@Injectable({
  providedIn: 'root',
})
export class TwelveWeekYearService {
  private data$: Observable<Goal[]>;
  private twelveWeekYearData: TwelveWeekYearData = {
    goals: [],
    taskResults: [],
    weeks: [],
  };
  private _goals$ = new BehaviorSubject<TwelveWeekYearData>(
    this.twelveWeekYearData
  );

  constructor(private service: GoalsService) {
    this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
    this.data$.subscribe((x) => {
      this.setGoals(x);
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
    return this._goals$.asObservable();
  }

  private getNextDay(day: Days, resetTime: boolean): Date {
    var dayIndex = day.valueOf();

    if (dayIndex === undefined) {
      throw new Error('"' + day + '" is not a valid input.');
    }

    var returnDate = new Date();
    var returnDay = returnDate.getDay();
    if (dayIndex !== returnDay) {
      returnDate.setDate(
        returnDate.getDate() + ((dayIndex + (7 - returnDay)) % 7)
      );
    }

    if (resetTime) {
      returnDate.setHours(0);
      returnDate.setMinutes(0);
      returnDate.setSeconds(0);
      returnDate.setMilliseconds(0);
    }
    return returnDate;
  }

  private init(goals: Goal[]) {
    let date = this.getNextDay(Days.sunday, true);
    const weeksCount = 1;
    const daysCount = 3;
    let weeks: Week[] = [];
    let taskResults: WeekDayResult[] = [];

    date = this.addDays(date, -7);
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
    }

    this.setWeeks(weeks);
    this.setTaskResults(taskResults);
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

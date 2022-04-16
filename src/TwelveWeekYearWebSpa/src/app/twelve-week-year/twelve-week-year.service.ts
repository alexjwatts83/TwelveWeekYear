import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GoalsService } from '../goals/goals.service';
import { Goal, GoalTypes, SubTask, Task } from '../goals/models';
import { TwelveWeekYear, Week, WeekDay, WeekDayResult } from './models';

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
  private twelveWeekYearData: TwelveWeekYear = {
    goals: [],
    taskResults: [],
    weeks: [],
    end: new Date(),
    start: new Date(),
    finalThoughts: 'Tis my finals thoughts on the situation.',
  };
  private _goals$ = new BehaviorSubject<TwelveWeekYear>(
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
    this.twelveWeekYearData.start = weeks[0].date;
    this.twelveWeekYearData.end = weeks[weeks.length - 1].date;
    this.twelveWeekYearData.weeks = weeks;
    this._goals$.next(this.twelveWeekYearData);
  }

  private setTaskResults(taskResults: WeekDayResult[]) {
    this.twelveWeekYearData.taskResults = taskResults;
    this._goals$.next(this.twelveWeekYearData);
  }

  getTwelveWeekData(): Observable<TwelveWeekYear> {
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
    const weeksCount = 12;
    const daysCount = 7;
    let weeks: Week[] = [];
    let taskResults: WeekDayResult[] = [];

    date = this.addDays(date, -7);
    for (let i = 0; i < weeksCount; i++) {
      date = this.addDays(date, 7);
      this.initWeeksAndDays(weeks, i, date, daysCount);

      goals.forEach((goal: Goal) => {
        goal.tasks.forEach((task: Task) => {
          const week = weeks[weeks.length - 1];
          week.days.forEach((day) => {
            this.setDaysSubtasks(task, week, goal, day, taskResults);
          });
        });
      });
    }

    this.setWeeks(weeks);
    this.setTaskResults(taskResults);
  }

  private setDaysSubtasks(
    t: Task,
    w: Week,
    x: Goal,
    d: WeekDay,
    taskResults: WeekDayResult[]
  ) {
    if (t.subTasks == null) {
      t.subTasks = [];
    }
    if (t.subTasks.length === 0) {
      this.AddWeekDayResult(w, x, t, d, null, taskResults);
      return;
    }

    t.subTasks.forEach((sb) => {
      this.AddWeekDayResult(w, x, t, d, sb, taskResults);
    });
  }

  private AddWeekDayResult(
    week: Week,
    goal: Goal,
    task: Task,
    weekday: WeekDay,
    subtask: SubTask | null,
    taskResults: WeekDayResult[]
  ) {
    let taskResult: WeekDayResult = {
      weekNumber: week.number,
      goalId: goal.id,
      taskId: task.id,
      date: weekday.date,
      completed: this.isOdd(this.getRandomInt(1, 100)),
      subTaskId: subtask != null ? subtask.id : null,
    };
    taskResults.push(taskResult);
  }

  private initWeeksAndDays(
    weeks: Week[],
    i: number,
    date: Date,
    daysCount: number
  ) {
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

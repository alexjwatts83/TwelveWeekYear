import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  private taskResults: WeekDayResult[] = [];
  taskResults$!: Observable<WeekDayResult[]>;
  data$!: Observable<Goal[]>;
  twelveWeekYearGoals: Goal[] = [];

  private weekOneFirstGoalId = '';

  constructor(private service: GoalsService) {
    this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
  }

  ngOnInit(): void {
    this.data$.subscribe((x) => {
      this.twelveWeekYearGoals = x;
      this.taskResults$ = this.init();
    });
  }

  private init(): Observable<WeekDayResult[]> {
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

  getGoalDailyProgressCount(
    weekNumber: number,
    goalId: string,
    taskId: string
  ): number {

    const groupBy = (array: any[], key: string) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
    };

    let thisTaskResults = this.taskResults.filter(
      (x) =>
        x.goalId == goalId && x.weekNumber == weekNumber && taskId === x.taskId
    );
    if (weekNumber === 1 && this.weekOneFirstGoalId === goalId) {
      // Accepts the array and key

      const taskedGrouped = groupBy(thisTaskResults, 'date');

      // console.log({});
      if (thisTaskResults.length === 0) {
        console.log({
          weekNumber,
          goalId,
          taskedGrouped,
          thisTaskResults,
          all: this.taskResults,
        });
      } else {
        console.log({
          weekNumber,
          goalId,
          taskedGrouped,
          thisTaskResults,
          all: this.taskResults,
        });
      }
    }

    if (thisTaskResults.some(t => t.subTaskId != null)) {
      // TODO: refactor this
      const taskedGrouped = groupBy(thisTaskResults, 'date');
      console.log({goal: 'has subtasks', weekNumber,
      goalId,thisTaskResults, taskedGrouped});

      let count = 0;
      let k: keyof typeof taskedGrouped;  // Type is "one" | "two" | "three"
      for (k in taskedGrouped) {
        const v = taskedGrouped[k];  // OK
        console.log({k, v});
        if (v.every((c: WeekDayResult) => c.completed)) {
          count++;
        }
      }
      return count;
    }

    return thisTaskResults.filter(x => x.completed).length;
  }

  // private groupBy<T>(list: T[], keyGetter: any) {
  //   const map = new Map();
  //   list.forEach((item) => {
  //     const key = keyGetter(item);
  //     const collection = map.get(key);
  //     if (!collection) {
  //       map.set(key, [item]);
  //     } else {
  //       collection.push(item);
  //     }
  //   });
  //   return map;
  // }
}

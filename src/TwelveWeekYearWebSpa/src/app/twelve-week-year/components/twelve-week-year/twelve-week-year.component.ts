import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GoalsService } from 'src/app/goals/goals.service';
import { Goal, GoalTypes } from 'src/app/goals/models';
import { Week, WeekDayResult } from '../../models';
import { TwelveWeekYearData, TwelveWeekYearService } from '../../twelve-week-year.service';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  // weeks: Week[] = [];
  // private taskResults: WeekDayResult[] = [];
  // taskResults$!: Observable<WeekDayResult[]>;
  data$!: Observable<TwelveWeekYearData>;
  private _data: TwelveWeekYearData | undefined;
  // twelveWeekYearGoals: Goal[] = [];

  // private weekOneFirstGoalId = '';

  constructor(
    // private service: GoalsService,
    private service: TwelveWeekYearService) {
    this.data$ = this.service.getTwelveWeekData();
  }

  ngOnInit(): void {
    if (this.data$) {
      this.data$.subscribe((x) => {
        console.log({x});
        this._data = x;
        // this.twelveWeekYearGoals = x;
        // this.taskResults$ = this.init();
      });
    }
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

    let thisTaskResults = this._data?.taskResults.filter(
      (x) =>
        x.goalId == goalId && x.weekNumber == weekNumber && taskId === x.taskId
    );
    // if (weekNumber === 1 && this.weekOneFirstGoalId === goalId) {
    //   // Accepts the array and key

    //   const taskedGrouped = groupBy(thisTaskResults, 'date');

    //   // console.log({});
    //   if (thisTaskResults.length === 0) {
    //     console.log({
    //       weekNumber,
    //       goalId,
    //       taskedGrouped,
    //       thisTaskResults,
    //       all: this.taskResults,
    //     });
    //   } else {
    //     console.log({
    //       weekNumber,
    //       goalId,
    //       taskedGrouped,
    //       thisTaskResults,
    //       all: this.taskResults,
    //     });
    //   }
    // }

    if (thisTaskResults == null) {
      return 0;
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

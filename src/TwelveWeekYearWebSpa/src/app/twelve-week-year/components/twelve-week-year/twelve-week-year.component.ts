import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TwelveWeekYear, WeekDayResult } from '../../models';
import { TwelveWeekYearService } from '../../twelve-week-year.service';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  private _data: TwelveWeekYear | undefined;
  data$!: Observable<TwelveWeekYear>;

  constructor(private service: TwelveWeekYearService) {
    this.data$ = this.service.getTwelveWeekData();
  }

  ngOnInit(): void {
    if (this.data$) {
      this.data$.subscribe((x: TwelveWeekYear) => {
        console.log({ x });
        this._data = x;
      });
    }
  }

  private groupBy<Val, Key>(list: Val[], predicate: (value: Val) => Key): Map<Key, Val[]> {
    const map = new Map();
    list.forEach((item) => {
      const key = predicate(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // private groupBy(array: any[], key: string) {
  //   // Return the end result
  //   return array.reduce((result, currentValue) => {
  //     // If an array already present for key, push it to the array. Else create an array and push the object
  //     (result[currentValue[key]] = result[currentValue[key]] || []).push(
  //       currentValue
  //     );
  //     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
  //     return result;
  //   }, {}); // empty object is the initial value for result object
  // }

  getGoalDailyProgressCount(
    weekNumber: number,
    goalId: string,
    taskId: string
  ): number {
    let thisTaskResults = this._data?.taskResults.filter(
      (x) =>
        x.goalId == goalId && x.weekNumber == weekNumber && taskId === x.taskId
    );

    if (thisTaskResults == null) {
      return 0;
    }

    if (thisTaskResults.some((t) => t.subTaskId != null)) {
      // TODO: refactor this
      const taskedGrouped = this.groupBy<WeekDayResult, Date>(
        thisTaskResults,
        (t) => t.date
      );
      let count = 0;

      for(let [key, value] of taskedGrouped) {
        let allCompleted = value.every((result: WeekDayResult) => result.completed);
        count = allCompleted ? count + 1 : count;
      }
      // let k: keyof typeof taskedGrouped;
      // for (k in taskedGrouped) {
      //   const v = taskedGrouped[k];
      //   if (v.every((c: WeekDayResult) => c.completed)) {
      //     count++;
      //   }
      // }
      return count;
    }

    return thisTaskResults.filter((x) => x.completed).length;
  }
}

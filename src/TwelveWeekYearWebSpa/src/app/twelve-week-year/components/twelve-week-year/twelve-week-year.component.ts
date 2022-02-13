import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeekDayResult } from '../../models';
import {
  TwelveWeekYearData,
  TwelveWeekYearService,
} from '../../twelve-week-year.service';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  private _data: TwelveWeekYearData | undefined;
  data$!: Observable<TwelveWeekYearData>;

  constructor(private service: TwelveWeekYearService) {
    this.data$ = this.service.getTwelveWeekData();
  }

  ngOnInit(): void {
    if (this.data$) {
      this.data$.subscribe((x: TwelveWeekYearData) => {
        console.log({ x });
        this._data = x;
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

    if (thisTaskResults == null) {
      return 0;
    }

    if (thisTaskResults.some((t) => t.subTaskId != null)) {
      // TODO: refactor this
      const taskedGrouped = groupBy(thisTaskResults, 'date');
      let count = 0;
      let k: keyof typeof taskedGrouped;
      for (k in taskedGrouped) {
        const v = taskedGrouped[k];
        if (v.every((c: WeekDayResult) => c.completed)) {
          count++;
        }
      }
      return count;
    }

    return thisTaskResults.filter((x) => x.completed).length;
  }
}

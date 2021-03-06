import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/goals/models';
import { Week, WeekDayResult } from 'src/app/twelve-week-year/models';

@Component({
  selector: 'app-subtasks-card',
  templateUrl: './subtasks-card.component.html',
  styleUrls: ['./subtasks-card.component.scss'],
})
export class SubtasksCardComponent implements OnInit {
  @Input() i!: number;
  @Input() week!: Week;
  @Input() goal!: Goal;
  @Input() taskResults!: WeekDayResult[];

  constructor() {}

  ngOnInit(): void {}
  private groupBy<Val, Key>(
    list: Val[],
    predicate: (value: Val) => Key
  ): Map<Key, Val[]> {
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

  getGoalDailyProgressCount(
    weekNumber: number,
    goalId: string,
    taskId: string
  ): number {
    let thisTaskResults = this.taskResults.filter(
      (x) =>
        x.goalId == goalId && x.weekNumber == weekNumber && taskId === x.taskId
    );

    if (thisTaskResults == null) {
      return 0;
    }

    if (thisTaskResults.some((t) => t.subTaskId != null)) {
      const taskedGrouped = this.groupBy<WeekDayResult, Date>(
        thisTaskResults,
        (t) => t.date
      );

      let count = 0;

      for (let [key, value] of taskedGrouped) {
        let allCompleted = value.every(
          (result: WeekDayResult) => result.completed
        );
        count = allCompleted ? count + 1 : count;
      }

      return count;
    }

    return thisTaskResults.filter((x) => x.completed).length;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, GoalTypes, Task } from './models/goal';
import { v4 as uuidv4 } from 'uuid';
import { GOALS_DATA } from './goals-data';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private data: Goal[] = GOALS_DATA;
  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() {}

  getGoals(goalType: GoalTypes): Observable<Goal[]> {
    return this._goals$
      .asObservable()
      .pipe(
        map((data) => data.filter((workorder) => workorder.type === goalType))
      );
  }

  setGoals(goal: Goal[]) {
    this._goals$.next(goal);
  }

  addGoal(description: string, goalType: GoalTypes, tasks: Task[] = []): void {
    let goal: Goal = {
      id: uuidv4(),
      description,
      type: goalType,
      tasks: tasks,
    };

    this.data.push(goal);

    this.setGoals(this.data);
  }
}

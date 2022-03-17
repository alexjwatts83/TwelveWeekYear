import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, GoalTypes, Task } from './models/goal';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private data: Goal[] = [];
  private _goals$ = new BehaviorSubject<Goal[]>(this.data);
  url = 'http://localhost:3000/goals';

  constructor(private http: HttpClient) {
    this.http
      .get(this.url)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe((x) => {
        this.setGoals(x);
      });
  }

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

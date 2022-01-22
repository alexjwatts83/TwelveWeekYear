import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal, GoalTypes } from './models/goal';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  data: Goal[] = [
    {
      description: 'Do Stuff',
      id: 'f93286f2-0d8b-4316-b9c3-50a0b52eb834',
      type: GoalTypes.ThisYear
    },
    {
      description: 'Do more stuff',
      id: '80a1d50a-eee2-4e33-9ea8-a370aa1fd571',
      type: GoalTypes.ThisYear
    },
    {
      description: 'Other stuff',
      id: '96fb1d2f-badb-4cef-b3f6-023f8663b251',
      type: GoalTypes.ThisYear
    }
  ];

  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() {
    // this.data.forEach(x => x.id = uuidv4());
  }

  getGoals(): Observable<Goal[]> {
    return this._goals$.asObservable();
  }

  setGoals(goal: Goal[]) {
      this._goals$.next(goal);
  }

  addGoal(description: string, goalType: GoalTypes): void {
    let goal: Goal = {
      id: uuidv4(),
      description,
      type: goalType
    };
    this.data.push(goal);
    this.setGoals(this.data);
  }
}

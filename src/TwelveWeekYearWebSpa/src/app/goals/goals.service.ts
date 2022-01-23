import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    },
    {
      description: '3 to 5 Year 1',
      id: 'dcccb72b-5a96-40c4-bd32-31d3723fcaeb',
      type: GoalTypes.ThreeToFiveYear
    },
    {
      description: '3 to 5 Year 2',
      id: '3fcfcc15-d425-426d-a597-feb430f4cb8c',
      type: GoalTypes.ThreeToFiveYear
    },
    {
      description: '3 to 5 Year 3',
      id: '1fbdf4e4-4b34-40f7-822f-b70853af57a0',
      type: GoalTypes.ThreeToFiveYear
    }
  ];

  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() {
    // this.data.forEach(x => x.id = uuidv4());
  }

  getGoals(goalType: GoalTypes): Observable<Goal[]> {
    console.log({goalType});
    return this._goals$.asObservable()
    .pipe(map(data => data.filter(workorder => workorder.type === goalType) ));
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

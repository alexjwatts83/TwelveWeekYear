import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal } from './models/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  data: Goal[] = [
    {
      description: 'Do Stuff',
      id: '1'
    },
    {
      description: 'Do more stuff',
      id: '2'
    },
    {
      description: 'Other stuff',
      id: '3'
    }
  ];

  private _goals$ = new BehaviorSubject<Goal[]>(this.data);

  constructor() { }

  getGoals(): Observable<Goal[]> {
    return this._goals$.asObservable();
  }

  setGoals(profile: Goal[]) {
      this._goals$.next(profile);
  }
}

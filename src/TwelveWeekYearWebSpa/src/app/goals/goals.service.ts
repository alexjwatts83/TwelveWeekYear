import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal } from './models/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private _goals$ = new BehaviorSubject<Goal[]>([]);

  constructor() { }

  getGoals(): Observable<Goal[]> {
    return this._goals$.asObservable();
  }

  setGoals(profile: Goal[]) {
      this._goals$.next(profile);
  }
}

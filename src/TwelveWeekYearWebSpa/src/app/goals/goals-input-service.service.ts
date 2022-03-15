import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './models';

@Injectable({
  providedIn: 'root',
})
export class GoalsInputServiceService {
  private data: Task[] = [];
  private _tasks$ = new BehaviorSubject<Task[]>(this.data);
  private _resetTrigger$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  resetTriggered(): Observable<boolean> {
    return this._resetTrigger$.asObservable();
  }

  resetTasks() {
    this.data = [];
    this.setTasks();
    this._resetTrigger$.next(true);
  }

  private setTasks() {
    this._tasks$.next(this.data);
  }

  addTask(task: Task): void {
    this.data.push({ ...task });

    this.setTasks();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class GoalsInputServiceService {
  private data: Task[] = [];
  private _tasks$ = new BehaviorSubject<Task[]>(this.data);
  private _resetTrigger$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getTasks(): Observable<Task[]> {
    console.log({getTasks: true});
    return this._tasks$
      .asObservable();
  }

  resetTriggered(): Observable<boolean> {
    return this._resetTrigger$.asObservable();
  }

  resetTasks() {
    console.log({getTasks: true});
    this.data = [];
    this.setTasks();
    this._resetTrigger$.next(true);
  }

  private setTasks() {
    console.log({setTasks: true});
    this._tasks$.next(this.data);
  }

  addTask(task: Task): void {
    console.log({addTask: task});
    this.data.push({...task});

    this.setTasks();
    console.log({data: this.data});
  }
}

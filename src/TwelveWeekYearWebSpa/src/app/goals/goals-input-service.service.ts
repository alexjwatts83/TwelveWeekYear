import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class GoalsInputServiceService {
  private data: Task[] = [];
  private _tasks$ = new BehaviorSubject<Task[]>(this.data);

  constructor() { }

  getTasks(): Observable<Task[]> {
    console.log({getTasks: true});
    return this._tasks$
      .asObservable();
  }

  private setTasks(task: Task[]) {
    this._tasks$.next(task);
  }

  addTask(task: Task): void {
    console.log({addTask: task});
    this.data.push({...task});

    this.setTasks(this.data);
    console.log({data: this.data});
  }
}

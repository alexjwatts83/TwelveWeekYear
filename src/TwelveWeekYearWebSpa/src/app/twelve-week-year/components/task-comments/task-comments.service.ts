import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskComments } from './models';

@Injectable({
  providedIn: 'root',
})
export class TaskCommentsService {
  private data: TaskComments[] = [];
  private _taskComments$ = new BehaviorSubject<TaskComments[]>(this.data);

  constructor() {}

  getComments(taskId: string, weekNumber: number): Observable<TaskComments[]> {
    // console.log({ goalType });
    return this._taskComments$
      .asObservable()
      .pipe(
        map((data) =>
          data.filter(
            (tc) => tc.taskId === taskId && tc.weekNumber == weekNumber
          )
        )
      );
  }

  setComments(taskComments: TaskComments[]) {
    this._taskComments$.next(taskComments);
  }
}

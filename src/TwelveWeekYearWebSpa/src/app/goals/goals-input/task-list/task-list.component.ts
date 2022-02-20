import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable,  Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalsInputServiceService } from '../../goals-input-service.service';
import { Task } from '../../models';

export interface TaskForEdit extends Task {
  isEditing: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasksForEdit$: Observable<TaskForEdit[]>;
  editSub!: Subscription;

  constructor(private inputService: GoalsInputServiceService) {
    this.tasksForEdit$ = this.inputService.getTasks().pipe(
      map((tasks) => {
        console.log({ GoalsInputTaskListComponent: tasks });
        let stufff = tasks.map((task: Task) => {
          return {
            ...task,
            isEditing: false,
          } as TaskForEdit;
        });
        return stufff;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  ngOnInit(): void {}

  editTaskDescription(index: number) {
    console.log({editTaskDescription: index});
    this.tasksForEdit$ = this.tasksForEdit$.pipe(
      map((tasks) => {
        tasks[index].isEditing = true
        return [...tasks];
      })
    );
  }

  saveTaskDescription(index: number) {
    console.log({saveTaskDescription: index});
    this.tasksForEdit$ = this.tasksForEdit$.pipe(
      map((tasks) => {
        tasks[index].isEditing = false
        console.log({save: tasks[index]});
        return [...tasks];
      })
    );
  }
}

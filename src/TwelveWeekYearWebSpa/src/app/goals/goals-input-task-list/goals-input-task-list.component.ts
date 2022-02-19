import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalsInputServiceService } from '../goals-input-service.service';
import { Task, SubTask } from '../models';

export interface TaskForEdit extends Task {
  isEditing: boolean;
}

@Component({
  selector: 'app-goals-input-task-list',
  templateUrl: './goals-input-task-list.component.html',
  styleUrls: ['./goals-input-task-list.component.scss']
})
export class GoalsInputTaskListComponent implements OnInit {
  tasksForEdit$: Observable<TaskForEdit[]>;

  constructor(private inputService: GoalsInputServiceService) { 
    console.log('cons')
    this.tasksForEdit$ = this.inputService.getTasks().pipe(map((tasks) => {
      console.log({GoalsInputTaskListComponent: tasks});
      let stufff = tasks.map((task: Task) => {
        return {
          ...task,
          isEditing: false
        } as TaskForEdit
      });
      return stufff;
    }));
  }

  ngOnInit(): void {
    // this.tasksForEdit = this.inputService.getTasks().pipe(map(x => { ... x})
    // this.tasksForEdit$ = this.inputService.getTasks().pipe(map((tasks) => {
    //   console.log({GoalsInputTaskListComponent: tasks});
    //   let stufff = tasks.map((task: Task) => {
    //     return {
    //       ...task,
    //       isEditing: false
    //     } as TaskForEdit
    //   });
    //   return stufff;
    // }));
    // console.log({task: this.tasks, taskForEdit: this.tasksForEdit});
  }

}

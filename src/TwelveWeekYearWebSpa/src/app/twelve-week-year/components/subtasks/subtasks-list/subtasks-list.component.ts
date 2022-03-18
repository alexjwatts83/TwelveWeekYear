import { Component, Input, OnInit } from '@angular/core';
import { Week, WeekDayResult } from "../../../models";
import { Task } from 'src/app/goals/models';

@Component({
  selector: 'app-subtasks-list',
  templateUrl: './subtasks-list.component.html',
  styleUrls: ['./subtasks-list.component.scss']
})
export class SubtasksListComponent implements OnInit {
  @Input() task!: Task;
  @Input() week!: Week;
  @Input() taskResults: WeekDayResult[] = [];

  private _taskResults: WeekDayResult[];
  private _subTaskResults: WeekDayResult[];

  constructor() { 
    this._taskResults = [];
    this._subTaskResults = [];
  }

  ngOnInit(): void {
    this._taskResults = this.taskResults.filter(x => x.taskId == this.task.id);
    if (this.task && this.task.subTasks) {
      this.task.subTasks.forEach(st => {
        let results = this.taskResults.filter(tr => tr.subTaskId === st.id);
        this._subTaskResults.push(...results);
      });
    }
  }

  isTaskCompleted(taskId: string, date: Date): boolean {
    let taskResult = this._taskResults.find(x => x.date === date && x.taskId === taskId && x.subTaskId == null);
    if (taskResult == null) {
      return false;
    }
    return taskResult.completed;
  }

  isSubTaskCompleted(subTaskId: string, date: Date): boolean {
    let subTaskResult = this._subTaskResults.find(x => x.date === date && x.subTaskId === subTaskId);
    if (subTaskResult == null) {
      return false;
    }
    return subTaskResult.completed;
  }

  toggleSubTaskCompleted(subTaskId: string, date: Date) {
    let subTaskResult = this._subTaskResults.find(x => x.date === date && x.subTaskId === subTaskId);
    if (subTaskResult == null) {
      return;
    }

    subTaskResult.completed = !subTaskResult.completed;
  }

  toggleTaskCompleted(taskId: string, date: Date) {
    let taskResult = this._taskResults.find(x => x.date === date && x.taskId === taskId && x.subTaskId == null);
    if (taskResult == null) {
      return;
    }
    
    taskResult.completed = !taskResult.completed;
  }
}

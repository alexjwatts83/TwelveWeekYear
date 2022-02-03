import { Component, Input, OnInit } from '@angular/core';
import { Week, WeekDayResult } from "../../models/";
import { Task } from 'src/app/goals/models';

@Component({
  selector: 'app-twelve-week-year-subtasks-list',
  templateUrl: './twelve-week-year-subtasks-list.component.html',
  styleUrls: ['./twelve-week-year-subtasks-list.component.scss']
})
export class TwelveWeekYearSubtasksListComponent implements OnInit {
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
    this.task.subTasks.forEach(st => {
      let results = this.taskResults.filter(tr => tr.subTaskId === st.id);
      this._subTaskResults.push(...results);
    });
    console.log({ taskId: this.task.id, tasksResults: this._taskResults, subTaskResuls:  this._subTaskResults });
  }

  isTaskCompleted(taskId: string, date: Date): boolean {
    let taskResult = this._taskResults.find(x => x.date === date && x.taskId === taskId);
    if (taskResult == null) {
      console.log('taskResult is null');
      return false;
    }
    return taskResult.completed;
  }

  isSubTaskCompleted(subTaskId: string, date: Date): boolean {
    let subTaskResult = this._subTaskResults.find(x => x.date === date && x.subTaskId === subTaskId);
    if (subTaskResult == null) {
      console.log('subTaskResult is null');
      return false;
    }
    return subTaskResult.completed;
  }
}

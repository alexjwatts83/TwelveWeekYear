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

  isCompleted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let tasksCompleted = this.taskResults.filter(x => x.taskId == this.task.id);
    let subTaskCompleted: any[] = [];
    this.task.subTasks.forEach(st => {
      let results = this.taskResults.filter(tr => tr.subTaskId === st.id);
      subTaskCompleted.push(...results);
    });
    console.log({ taskId: this.task.id, tasksCompleted, subTaskCompleted });
  }
}

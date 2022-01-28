import { Component, Input, OnInit } from '@angular/core';
import { Week } from "../../models/";
import { Task } from 'src/app/goals/models';

@Component({
  selector: 'app-twelve-week-year-subtasks-list',
  templateUrl: './twelve-week-year-subtasks-list.component.html',
  styleUrls: ['./twelve-week-year-subtasks-list.component.scss']
})
export class TwelveWeekYearSubtasksListComponent implements OnInit {
  @Input() task!: Task;
  @Input() week!: Week;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models';

@Component({
  selector: 'app-goals-input-task-list',
  templateUrl: './goals-input-task-list.component.html',
  styleUrls: ['./goals-input-task-list.component.scss']
})
export class GoalsInputTaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

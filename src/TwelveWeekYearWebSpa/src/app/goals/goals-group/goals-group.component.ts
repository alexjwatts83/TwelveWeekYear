import { Component, Input, OnInit } from '@angular/core';
import { GoalTypes } from '../models/goal';

@Component({
  selector: 'app-goals-group',
  templateUrl: './goals-group.component.html',
  styleUrls: ['./goals-group.component.scss']
})
export class GoalsGroupComponent implements OnInit {
  @Input() title!: string;
  @Input() goalType: GoalTypes = GoalTypes.None;

  constructor() { }

  ngOnInit(): void {
  }

}

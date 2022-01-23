import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal, GoalTypes } from '../models/goal';

@Component({
  selector: 'app-goals-group',
  templateUrl: './goals-group.component.html',
  styleUrls: ['./goals-group.component.scss']
})
export class GoalsGroupComponent implements OnInit {
  @Input() title!: string;
  @Input() goalType: GoalTypes = GoalTypes.None;
  
  goals!: Goal[];
  data$!: Observable<Goal[]>;
  
  constructor(private service: GoalsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getGoals(this.goalType);

    this.data$.subscribe((x) => {
      this.goals = x;
    });
  }

}

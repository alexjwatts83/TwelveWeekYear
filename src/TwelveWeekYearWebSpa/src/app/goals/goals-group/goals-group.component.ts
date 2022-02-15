import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalsService } from '../goals.service';
import { Goal, GoalTypes } from '../models';

@Component({
  selector: 'app-goals-group',
  templateUrl: './goals-group.component.html',
  styleUrls: ['./goals-group.component.scss'],
})
export class GoalsGroupComponent implements OnInit {
  @Input() title!: string;
  @Input() goalType: GoalTypes = GoalTypes.None;
  @Input() openAccordion: boolean = false;

  panelOpenState = false;
  data$!: Observable<Goal[]>;
  constructor(private service: GoalsService) {
    if (this.openAccordion) {
      this.panelOpenState = true;
    }
  }

  ngOnInit(): void {
    this.data$ = this.service.getGoals(this.goalType);
    if (this.openAccordion) {
      this.panelOpenState = true;
    }
  }
}

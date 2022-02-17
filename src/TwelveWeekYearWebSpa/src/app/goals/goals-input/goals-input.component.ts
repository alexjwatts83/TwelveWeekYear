import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { GoalsService } from '../goals.service';
import { GoalTypes, Task } from '../models';

@Component({
  selector: 'app-goals-input',
  templateUrl: './goals-input.component.html',
  styleUrls: ['./goals-input.component.scss'],
})
export class GoalsInputComponent implements OnInit {
  @Input() goalType!: GoalTypes;

  goalInputForm!: FormGroup;

  get tasks(): Task[] {
    return this._tasks;
  }

  private _tasks: Task[] = [];

  get canAddTasks(): boolean {
    if (this.goalType) {
      return this.goalType === GoalTypes.TwelveWeekYear;
    }
    return false;
  }

  constructor(private service: GoalsService) {}

  ngOnInit(): void {
    this._tasks = [];
    this.goalInputForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(f: FormGroupDirective) {
    this.service.addGoal(f.value.description, this.goalType);
    this.goalInputForm.reset();
    f.resetForm();
  }

  onTaskedAdded(task: Task) {
    this._tasks.push(task);
  }
}

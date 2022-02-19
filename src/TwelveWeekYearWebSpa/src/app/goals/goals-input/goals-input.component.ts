import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { GoalsInputServiceService } from '../goals-input-service.service';
import { GoalsService } from '../goals.service';
import { GoalTypes, Task } from '../models';

@Component({
  selector: 'app-goals-input',
  templateUrl: './goals-input.component.html',
  styleUrls: ['./goals-input.component.scss'],
})
export class GoalsInputComponent implements OnInit, OnDestroy {
  @Input() goalType!: GoalTypes;

  goalInputForm!: FormGroup;
  tasks$: Observable<Task[]>;
  private taskSub: Subscription;
  private tasks: Task[] = [];
  get canAddTasks(): boolean {
    if (this.goalType) {
      return this.goalType === GoalTypes.TwelveWeekYear;
    }
    return false;
  }

  constructor(
    private service: GoalsService,
    private inputService: GoalsInputServiceService
  ) {
    this.tasks$ = this.inputService.getTasks();
    this.taskSub = this.tasks$.subscribe((x) => {
      this.tasks = x;
      console.log('GoalsInputComponent getTasks');
    });
  }
  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.goalInputForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(f: FormGroupDirective) {
    this.service.addGoal(f.value.description, this.goalType, this.tasks);
    this.goalInputForm.reset();
    f.resetForm();
    this.inputService.resetTasks();
  }

  onTaskedAdded(task: Task) {
    this.inputService.addTask(task);
  }
}

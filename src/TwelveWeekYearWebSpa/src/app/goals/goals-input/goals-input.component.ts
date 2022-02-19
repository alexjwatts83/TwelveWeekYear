import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RandomTextServiceService } from 'src/app/shared/random-text-service.service';
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

  private description$: Observable<string>;
  private descriptionSub!: Subscription;

  get canAddTasks(): boolean {
    if (this.goalType) {
      return this.goalType === GoalTypes.TwelveWeekYear;
    }
    return false;
  }

  constructor(
    private service: GoalsService,
    private inputService: GoalsInputServiceService,
    private textServcice: RandomTextServiceService
  ) {
    this.tasks$ = this.inputService.getTasks();
    this.taskSub = this.tasks$.subscribe((x) => {
      this.tasks = x;
      console.log('GoalsInputComponent getTasks');
    });
    this.description$ = this.textServcice.getDescription();

  }
  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }

    if (this.descriptionSub) {
      this.descriptionSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log({ngOnInit: true});
    this.descriptionSub = this.description$.subscribe((x) => {
      console.log({goalDescription: x});
      this.goalInputForm = new FormGroup({
        description: new FormControl(x, [Validators.required]),
      });
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

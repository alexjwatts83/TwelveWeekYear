import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BusyService } from 'src/app/shared/busy-service.service';
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
    private textServcice: RandomTextServiceService,
    private busyService: BusyService
  ) {
    this.tasks$ = this.inputService.getTasks();
    this.taskSub = this.tasks$.subscribe((x) => {
      this.tasks = x;
    });
    this.description$ = this.textServcice.getLongDescription();
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
    this.busyService.busy();
    // console.log({ngOnInit: true});
    if (this.canAddTasks) {
      this.descriptionSub = this.description$.subscribe((x) => {
        this.resetForm(x);
      });
    } else {
      this.resetForm('');
    }
  }

  private resetForm(x: string) {
    this.goalInputForm = new FormGroup({
      description: new FormControl(x, [Validators.required]),
    });
    this.busyService.idle();
  }

  onSubmit(f: FormGroupDirective) {
    this.busyService.busy();
    this.service.addGoal(f.value.description, this.goalType, this.tasks);
    this.goalInputForm.reset();
    f.resetForm();
    this.inputService.resetTasks();
    this.busyService.idle();
  }

  onTaskedAdded(task: Task) {
    this.inputService.addTask(task);
  }
}

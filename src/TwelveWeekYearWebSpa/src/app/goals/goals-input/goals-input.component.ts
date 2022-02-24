import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { BusyService } from 'src/app/shared/busy-service.service';
import { RandomTextServiceService } from 'src/app/shared/random-text-service.service';
import { GoalsInputServiceService } from '../goals-input-service.service';
import { GoalsService } from '../goals.service';
import { GoalTypes, Task } from '../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-goals-input',
  templateUrl: './goals-input.component.html',
  styleUrls: ['./goals-input.component.scss'],
})
export class GoalsInputComponent implements OnInit, OnDestroy {
  @Input() goalType!: GoalTypes;

  goalInputForm!: FormGroup;
  taskInputForm!: FormGroup;
  subTaskForm!: FormGroup;

  private longDescription$: Observable<string>;
  private longDescriptionSub!: Subscription;
  private shortDescriptionSub!: Subscription;

  isLoading: boolean = false;

  get canAddTasks(): boolean {
    if (this.goalType) {
      return this.goalType === GoalTypes.TwelveWeekYear;
    }
    return false;
  }

  get taskForms() {
    return this.goalInputForm.controls['tasks'] as FormArray;
  }

  subtaskForms(i: number) {
    let c = this.taskForms.at(i) as FormGroup;
    return c.controls['subTasks'] as FormArray;
  }

  constructor(
    private service: GoalsService,
    private inputService: GoalsInputServiceService,
    private textServcice: RandomTextServiceService,
    private busyService: BusyService,
    private fb: FormBuilder
  ) {
    this.longDescription$ = this.textServcice.getLongDescription();
  }

  ngOnDestroy(): void {
    if (this.longDescriptionSub) {
      this.longDescriptionSub.unsubscribe();
    }

    if (this.shortDescriptionSub) {
      this.shortDescriptionSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.busyService.busy();
    this.init();
  }

  private init() {
    let obs$ = this.canAddTasks ? this.longDescription$ : of('');
    this.longDescriptionSub = obs$.subscribe((x) => {
      this.resetForm(x);
    });
  }

  private resetForm(x: string) {
    this.isLoading = true;
    this.longDescriptionSub = this.textServcice
      .getLongDescription()
      .subscribe((x) => {
        console.log({ x });
        this.goalInputForm = this.fb.group({
          description: new FormControl(x, [Validators.required]),
          tasks: this.fb.array([]),
          startDate: new FormControl(),
          endDate: new FormControl()
        });
        this.isLoading = false;
        this.inputService.resetTasks();
        this.busyService.idle();
      });
  }

  onSubmit(f: FormGroupDirective) {
    this.isLoading = true;
    setTimeout(() => {
      this.busyService.busy();
      let tasks = f.value.tasks as Task[];
      console.log({ tasks });
      this.service.addGoal(f.value.description, this.goalType, tasks);
      f.resetForm();
      this.init();
    }, 1000);
  }

  onTaskedAdded(task: Task) {
    this.inputService.addTask(task);
  }

  addTask() {
    this.isLoading = true;
    this.longDescriptionSub = this.textServcice
      .getLongDescription()
      .subscribe((x) => {
        console.log({ x });
        const taskForm = this.fb.group({
          id: [uuidv4(), Validators.required],
          description: [x, Validators.required],
          subTasks: this.fb.array([]),
        });
        this.taskForms.push(taskForm);
        console.log({ frm: this.taskForms });
        this.isLoading = false;
      });
  }

  deleteTask(index: number) {
    this.taskForms.removeAt(index);
  }

  addSubTask(taskIndex: number) {
    this.isLoading = true;
    this.shortDescriptionSub = this.textServcice
      .getShortDescription()
      .subscribe((x) => {
        console.log({ x });
        const subTaskForm = this.fb.group({
          id: [uuidv4(), Validators.required],
          description: [x, Validators.required],
        });
        this.subtaskForms(taskIndex).push(subTaskForm);
        console.log({ frm: this.subtaskForms });
        this.isLoading = false;
      });
  }

  deleteSubTask(taskIndex: number, index: number) {
    let c = this.taskForms.at(taskIndex) as FormGroup;
    (c.controls['subTasks'] as FormArray).removeAt(index);
  }
}

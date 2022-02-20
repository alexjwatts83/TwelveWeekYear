import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
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

  // tasks$: Observable<Task[]>;

  // private taskSub: Subscription;
  // private tasks: Task[] = [];

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
    private fb: FormBuilder,
  ) {

    // this.tasks$ = this.inputService.getTasks();
    // this.taskSub = this.tasks$.subscribe((x) => {
    //   this.tasks = x;
    // });
    this.longDescription$ = this.textServcice.getLongDescription();
  }

  ngOnDestroy(): void {
    // if (this.taskSub) {
    //   this.taskSub.unsubscribe();
    // }

    if (this.longDescriptionSub) {
      this.longDescriptionSub.unsubscribe();
    }

    if (this.shortDescriptionSub) {
      this.shortDescriptionSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.busyService.busy();
    // console.log({ngOnInit: true});
    if (this.canAddTasks) {
      this.longDescriptionSub = this.longDescription$.subscribe((x) => {
        this.resetForm(x);
      });
    } else {
      this.resetForm('');
    }
  }

  private resetForm(x: string) {
    this.goalInputForm = this.fb.group({
      description: new FormControl(x, [Validators.required]),
      tasks: this.fb.array([]),
    });
    this.busyService.idle();
  }

  onSubmit(f: FormGroupDirective) {
    this.busyService.busy();
    // this.service.addGoal(f.value.description, this.goalType, this.tasks);
    this.service.addGoal(f.value.description, this.goalType, []);
    this.goalInputForm.reset();
    f.resetForm();
    this.inputService.resetTasks();
    this.busyService.idle();
  }

  onTaskedAdded(task: Task) {
    this.inputService.addTask(task);
  }

  addTask() {
    this.isLoading = true;
    this.longDescriptionSub = this.textServcice.getLongDescription().subscribe((x) => {
      console.log({x});
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
    this.shortDescriptionSub = this.textServcice.getShortDescription().subscribe((x) => {
      console.log({x});
      const subTaskForm = this.fb.group({
        id: [uuidv4(), Validators.required],
        description: [x, Validators.required],
      });
      this.subtaskForms(taskIndex).push(subTaskForm);
      console.log({ frm: this.subtaskForms });
      this.isLoading = false;
    });
  }
}

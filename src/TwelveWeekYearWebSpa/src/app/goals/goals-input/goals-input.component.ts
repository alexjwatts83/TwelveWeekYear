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

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'YYYY-MM-DD', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-goals-input',
  templateUrl: './goals-input.component.html',
  styleUrls: ['./goals-input.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
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
        let start = new Date();
        let end = this.addDays(7 * 12);
        console.log({start, end});
        this.goalInputForm = this.fb.group({
          description: new FormControl(x, [Validators.required]),
          tasks: this.fb.array([]),
          startDate: new FormControl(start, Validators.required),
          endDate: new FormControl(end, Validators.required)
        });
        this.isLoading = false;
        this.inputService.resetTasks();
        this.busyService.idle();
      });
  }

  private addDays(days : number): Date{
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
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
}

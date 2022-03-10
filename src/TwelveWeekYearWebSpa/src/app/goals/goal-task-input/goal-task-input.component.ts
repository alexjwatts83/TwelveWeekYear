import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BusyService } from 'src/app/shared/busy-service.service';
import { RandomTextServiceService } from 'src/app/shared/random-text-service.service';
import { GoalsInputServiceService } from '../goals-input-service.service';
import { GoalsService } from '../goals.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-goal-task-input',
  templateUrl: './goal-task-input.component.html',
  styleUrls: ['./goal-task-input.component.scss'],
})
export class GoalTaskInputComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean = true;
  @Input() goalInputForm!: FormGroup;
  // @Input() taskForms!: FormArray;

  // @Output() onAddTask = new EventEmitter<void>();
  // @Output() onDeleteTask = new EventEmitter<number>();
  // @Output() onAddSubTask = new EventEmitter<number>();
  // @Output() onDeleteSubTask = new EventEmitter<{
  //   taskIndex: number;
  //   index: number;
  // }>();

  private longDescription$: Observable<string>;
  private longDescriptionSub!: Subscription;
  private shortDescriptionSub!: Subscription;
  
  constructor(
    private service: GoalsService,
    private inputService: GoalsInputServiceService,
    private textServcice: RandomTextServiceService,
    private busyService: BusyService,
    private fb: FormBuilder
  ) {
    this.longDescription$ = this.textServcice.getLongDescription();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.longDescriptionSub) {
      this.longDescriptionSub.unsubscribe();
    }

    if (this.shortDescriptionSub) {
      this.shortDescriptionSub.unsubscribe();
    }
  }

  // deleteTask(index: number) {
  //   this.onDeleteTask.emit(index);
  // }

  // addSubTask(index: number) {
  //   this.onAddSubTask.emit(index);
  // }

  subtaskForms(i: number) {
    console.log({tf: this.taskForms});
    let c = this.taskForms.at(i) as FormGroup;
    return c.controls['subTasks'] as FormArray;
  }

  // deleteSubTask(taskIndex: number, index: number) {
  //   this.onDeleteSubTask.emit({
  //     taskIndex, index
  //   });
  // }

  // addTask() {
  //   this.onAddSubTask.emit();
  // }

  get taskForms() {
    return this.goalInputForm.controls['tasks'] as FormArray;
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

  // subtaskForms(i: number) {
  //   let c = this.taskForms.at(i) as FormGroup;
  //   return c.controls['subTasks'] as FormArray;
  // }
}

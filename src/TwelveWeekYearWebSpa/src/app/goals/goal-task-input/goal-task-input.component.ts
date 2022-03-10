import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RandomTextServiceService } from 'src/app/shared/random-text-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-goal-task-input',
  templateUrl: './goal-task-input.component.html',
  styleUrls: ['./goal-task-input.component.scss'],
})
export class GoalTaskInputComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean = true;
  @Input() goalInputForm!: FormGroup;

  private longDescription$!: Observable<string>;
  private longDescriptionSub!: Subscription;
  private shortDescriptionSub!: Subscription;

  get taskForms() {
    return this.goalInputForm.controls['tasks'] as FormArray;
  }

  constructor(
    private textServcice: RandomTextServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.longDescriptionSub) {
      this.longDescriptionSub.unsubscribe();
    }

    if (this.shortDescriptionSub) {
      this.shortDescriptionSub.unsubscribe();
    }
  }

  subtaskForms(i: number) {
    console.log({ tf: this.taskForms });
    let c = this.taskForms.at(i) as FormGroup;
    return c.controls['subTasks'] as FormArray;
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

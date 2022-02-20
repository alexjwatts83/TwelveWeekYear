import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Task } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import { GoalsInputServiceService } from '../../goals-input-service.service';
import { Observable, Subscription } from 'rxjs';
import { RandomTextServiceService } from 'src/app/shared/random-text-service.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit, OnDestroy {
  @Output() taskAdded = new EventEmitter<Task>();
  
  taskInputForm!: FormGroup;
  subTaskForm!: FormGroup;
  isLoading: boolean = false;
  resetFormTrigger$: Observable<boolean>;

  private resetFormTriggerSub: Subscription;
  private getTextSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private inputService: GoalsInputServiceService,
    private textService: RandomTextServiceService
  ) {
    this.isLoading = true;
    this.resetFormTrigger$ = inputService.resetTriggered();
    this.resetFormTriggerSub = this.resetFormTrigger$.subscribe((x) => {
      console.log({ resetFormTriiger: x });
      if (x) {
        this.isLoading = true;
        this.getTextSub = this.textService.getLongDescription().subscribe((x) => {
          this.resetSubTaskForm();
          this.resetTaskInputForm(x);
          this.isLoading = false;
        });
      }
    });
    this.getTextSub = this.textService.getLongDescription().subscribe((x) => {
      this.resetSubTaskForm();
      this.resetTaskInputForm(x);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.resetFormTriggerSub) {
      this.resetFormTriggerSub.unsubscribe();
    }
    if (this.getTextSub) {
      this.getTextSub.unsubscribe();
    }
  }

  ngOnInit(): void {}

  get subTasks() {
    return this.taskInputForm.controls['subTasks'] as FormArray;
  }

  onSubmit(f: FormGroupDirective) {
    console.log({ onSubmit: f });
    let task = f.value as Task;
    console.log({ task });
    this.taskInputForm.reset();
    this.taskInputForm;
    f.resetForm();
    // this.resetTaskInputForm('');
    this.taskAdded.emit(task);
    this.isLoading = true;
    this.getTextSub = this.textService.getLongDescription().subscribe((x) => {
      this.resetSubTaskForm();
      this.resetTaskInputForm(x);
      this.isLoading = false;
    });
  }

  private resetTaskInputForm(description: string) {
    this.taskInputForm = this.fb.group({
      id: new FormControl(uuidv4(), [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      subTasks: this.fb.array([]),
    });
  }

  private resetSubTaskForm() {
    this.subTaskForm = this.fb.group({
      id: [uuidv4(), Validators.required],
      description: ['', Validators.required],
    });
  }

  addSubTask() {
    this.isLoading = true;
    this.getTextSub = this.textService.getShortDescription().subscribe((x) => {
      console.log({x});
      const subTaskForm = this.fb.group({
        id: [uuidv4(), Validators.required],
        description: [x, Validators.required],
      });
      this.subTasks.push(subTaskForm);
      console.log({ frm: this.subTasks });
      this.isLoading = false;
    });
  }

  deleteTask(index: number) {
    this.subTasks.removeAt(index);
  }
}

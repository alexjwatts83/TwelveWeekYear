import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { GoalsInputServiceService } from '../../goals-input-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit, OnDestroy {
  taskInputForm!: FormGroup;
  subTaskForm!: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>();

  isLoading: boolean = false;
  private url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1';

  resetFormTriiger$: Observable<boolean>;
  private resetFormTriigerSub: Subscription;

  constructor(private fb: FormBuilder, private http: HttpClient, private inputService: GoalsInputServiceService) {
    this.isLoading = true;
    this.resetFormTriiger$ = inputService.resetTriggered();
    this.resetFormTriigerSub = this.resetFormTriiger$.subscribe(x => {
      console.log({resetFormTriiger: x});
      if (x) {
        this.isLoading = true;
        this.resetSubTaskForm();
        this.resetTaskInputForm('');
        this.isLoading = false;
      }
    });
    this.http.get<string[]>(this.url).subscribe((x) => {
      this.resetSubTaskForm();
      this.resetTaskInputForm(x[0]);
      this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    if (this.resetFormTriigerSub) {
      this.resetFormTriigerSub.unsubscribe();
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
    this.resetTaskInputForm('');
    this.taskAdded.emit(task);
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
    this.http.get<string[]>(this.url).subscribe((x) => {
      console.log({ x });
      const subTaskForm = this.fb.group({
        id: [uuidv4(), Validators.required],
        description: [x[0], Validators.required],
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

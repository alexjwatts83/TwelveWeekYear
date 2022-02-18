import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Task } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit {
  taskInputForm!: FormGroup;
  subTaskForm!: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1';
    let stuff = this.http.get<string[]>(url);
    stuff.subscribe((x) => {
      console.log({ constructor: x });
      this.subTaskForm = this.fb.group({
        id: [uuidv4(), Validators.required],
        description: ['', Validators.required],
      });

      this.taskInputForm = this.fb.group({
        id: new FormControl(uuidv4(), [Validators.required]),
        description: new FormControl(x[0], [Validators.required]),
        subTasks: this.fb.array([]),
      });
    });
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
    this.taskInputForm = this.fb.group({
      id: new FormControl(uuidv4(), [Validators.required]),
      description: new FormControl('', [Validators.required]),
      subTasks: this.fb.array([]),
    });
    this.taskAdded.emit(task);
  }

  addSubTask() {
    const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1';
    let stuff = this.http.get<string[]>(url);
    stuff.subscribe((x) => {
      console.log({ x });
      const subTaskForm = this.fb.group({
        id: [uuidv4(), Validators.required],
        description: [x[0], Validators.required],
      });
      this.subTasks.push(subTaskForm);
      console.log({ frm: this.subTasks });
    });
  }

  deleteTask(index: number) {
    this.subTasks.removeAt(index);
  }
}

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

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit {
  taskInputForm: FormGroup;
  subTaskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {
    this.subTaskForm = this.fb.group({
      id: [uuidv4(), Validators.required],
      description: ['Keep it real', Validators.required],
    });

    this.taskInputForm = this.fb.group({
      id: new FormControl(uuidv4(), [Validators.required]),
      description: new FormControl('', [Validators.required]),
      subTasks: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get subTasks() {
    return this.taskInputForm.controls['subTasks'] as FormArray;
  }

  onSubmit(f: FormGroupDirective) {
    console.log({onSubmit: f});
    let task = f.value as Task;
    this.taskInputForm.reset();
    f.resetForm();

    this.taskAdded.emit(task);
  }

  addSubTask() {
    let f = {... this.subTaskForm};
    this.subTasks.push(this.subTaskForm);

    // const lessonForm = this.fb.group({
    //   id: [uuidv4(), Validators.required],
    //   description: ['Keep it real', Validators.required],
    // });

    // this.subTasks.push(lessonForm);

    console.log({ frm: this.subTasks });
  }

  deleteTask(index: number) {
    this.subTasks.removeAt(index);
  }
}

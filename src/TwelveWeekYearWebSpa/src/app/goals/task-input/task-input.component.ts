import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Task } from '../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {
  taskInputForm!: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {
    this.taskInputForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(f: FormGroupDirective) {
    let task = f.value as Task;
    this.taskInputForm.reset();
    f.resetForm();

    this.taskAdded.emit(task);
  }

}

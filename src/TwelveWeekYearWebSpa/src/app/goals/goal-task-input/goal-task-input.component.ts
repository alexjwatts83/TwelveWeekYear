import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-goal-task-input',
  templateUrl: './goal-task-input.component.html',
  styleUrls: ['./goal-task-input.component.scss']
})
export class GoalTaskInputComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Input() goalInputForm!: FormGroup;
  @Input() taskForms!: FormArray;

  @Output() onDeleteTask = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(index: number) {
    this.onDeleteTask.emit(index);
    // this.taskForms.removeAt(index);
  }
}

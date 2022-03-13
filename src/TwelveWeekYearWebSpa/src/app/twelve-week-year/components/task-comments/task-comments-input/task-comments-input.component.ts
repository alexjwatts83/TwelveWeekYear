import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Week } from 'src/app/twelve-week-year/models';
import { Task } from 'src/app/goals/models';
import { TaskCommentsService } from '../task-comments.service';

@Component({
  selector: 'app-task-comments-input',
  templateUrl: './task-comments-input.component.html',
  styleUrls: ['./task-comments-input.component.scss'],
})
export class CommentsInputComponent implements OnInit {
  @Input() task!: Task;
  @Input() week!: Week;

  commentsForm!: FormGroup;
  constructor(private service: TaskCommentsService) {}

  ngOnInit(): void {
    this.commentsForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(f: FormGroupDirective) {
    this.service.addComment(
      this.task.id,
      this.week.number,
      f.value.comment,
      new Date()
    );
    this.commentsForm.reset();
    f.resetForm();
  }
}

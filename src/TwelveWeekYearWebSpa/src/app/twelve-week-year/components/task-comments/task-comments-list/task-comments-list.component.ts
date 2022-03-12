import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/goals/models';
import { Week } from 'src/app/twelve-week-year/models';
import { LeComment, TaskComments } from '../models';
import { TaskCommentsService } from '../task-comments.service';

@Component({
  selector: 'app-task-comments-list',
  templateUrl: './task-comments-list.component.html',
  styleUrls: ['./task-comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() task!: Task;
  @Input() week!: Week;

  private data$!: Observable<TaskComments[]>;
  comments: LeComment[] = [];
  constructor(private service: TaskCommentsService) {}

  ngOnInit(): void {
    this.data$ = this.service.getComments(this.task.id, this.week.number);
    this.data$.subscribe((taskComments) => {
      taskComments.forEach((tc) => {
        this.comments = tc.comments;
      });
    });
  }
}

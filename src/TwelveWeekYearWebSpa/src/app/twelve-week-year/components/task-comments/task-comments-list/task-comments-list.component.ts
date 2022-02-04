import { Component, Input, OnInit } from '@angular/core';
import { LeComment, Week } from '../../../models';
import { Task } from 'src/app/goals/models';

@Component({
  selector: 'app-task-comments-list',
  templateUrl: './task-comments-list.component.html',
  styleUrls: ['./task-comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() weeks: Week[] = [];
  @Input() task!: Task;
  @Input() week!: Week;

  comments: LeComment[] = [];
  constructor() { }

  ngOnInit(): void {
    // this.comments = this.getCommentsForTask(this.week.date, this.task.id);
  }

  // private getCommentsForTask(weekDate: Date, taskId: string) : LeComment[] {
  //   let week = this.weeks.find(x => x.date === weekDate);
  //   if (week === undefined) {
  //     return [];
  //   }
  //   let taskComments = week.taskComments.filter(x => x.taskId === taskId);
  //   let comments: LeComment[] = [];
  //   taskComments.forEach(t => {
  //     t.comments.forEach(c => {
  //       comments.push(c);
  //     });
  //   });
  //   return comments;
  // }
}

import { Task } from '../../goals/models/goal';

export interface LeComment {
  date: Date;
  comment: string;
}

export interface TaskComments {
  taskId: string;
  comments: LeComment[];
}

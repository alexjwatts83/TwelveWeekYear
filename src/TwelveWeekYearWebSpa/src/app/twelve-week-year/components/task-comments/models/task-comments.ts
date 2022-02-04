import { Task } from '../../../../goals/models/goal';

export interface LeComment {
  date: Date;
  comment: string;
}

export interface TaskComments {
  taskId: string;
  weekNumber: number;
  comments: LeComment[];
}

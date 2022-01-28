import { Task } from '../../goals/models/goal';


export interface TaskComments {
  task: Task;
  comments: string[];
}

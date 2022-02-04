import { WeekDay } from "./week-day";
import { TaskComments } from "./task-comments";

export interface Week {
  number: number;
  date: Date;
  days: WeekDay[];
  taskComments: TaskComments[];
}

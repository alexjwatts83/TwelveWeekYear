import { WeekDay } from "./week-day";
import { TaskComments } from "./task-comments";

export interface Week {
  number: Number;
  date: Date;
  days: WeekDay[];
  taskComments: TaskComments[];
}

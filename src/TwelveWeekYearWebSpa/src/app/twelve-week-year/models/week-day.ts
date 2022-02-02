export interface WeekDay {
  date: Date;
  comments: string;
}

export interface WeekDayResult {
  date: Date;
  taskId: string;
  subTaskId: string;
  completed: boolean;
}

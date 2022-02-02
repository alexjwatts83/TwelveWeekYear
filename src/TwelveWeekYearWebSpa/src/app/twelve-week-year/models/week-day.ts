export interface WeekDay {
  date: Date;
  comments: string;
}

export interface WeekDayResult {
  date: Date;
  taskId: string | null;
  subTaskId: string | null;
  completed: boolean;
}

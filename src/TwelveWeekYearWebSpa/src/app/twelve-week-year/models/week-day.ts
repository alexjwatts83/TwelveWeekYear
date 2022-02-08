export interface WeekDay {
  date: Date;
  comments: string;
}

export interface WeekDayResult {
  date: Date;
  goalId: string;
  taskId: string | null;
  subTaskId: string | null;
  completed: boolean;
}

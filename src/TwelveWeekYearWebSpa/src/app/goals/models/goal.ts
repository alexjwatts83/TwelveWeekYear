export enum GoalTypes {
  None = 0,
  ThreeToFiveYear = 1,
  ThisYear = 2,
  TwelveWeekYear = 3
}
export interface SubTask {
  id: string;
  description: string;
}

export interface Task {
  id: string;
  description: string;
  subTasks: SubTask[];
}

export interface Goal {
  id: string;
  description: string;
  type: GoalTypes;
  tasks: Task[];
}
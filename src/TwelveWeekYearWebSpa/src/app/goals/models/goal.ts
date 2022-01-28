export enum GoalTypes {
  None,
  ThreeToFiveYear,
  ThisYear,
  TwelveWeekYear
}
export interface SubTask {
  description: string;
}

export interface Task {
  description: string;
  subTasks: SubTask[];
}

export interface Goal {
  id: string;
  description: string;
  type: GoalTypes;
  tasks: Task[];
}
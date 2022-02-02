export enum GoalTypes {
  None,
  ThreeToFiveYear,
  ThisYear,
  TwelveWeekYear
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
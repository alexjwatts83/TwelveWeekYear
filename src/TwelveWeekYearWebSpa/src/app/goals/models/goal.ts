export enum GoalTypes {
  None,
  ThreeToFiveYear,
  ThisYear,
  TwelveWeekYear
}
export interface Task {
  description: string;
}
export interface Goal {
  id: string;
  description: string;
  type: GoalTypes;
  tasks: Task[];
}
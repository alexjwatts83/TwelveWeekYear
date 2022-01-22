export enum GoalTypes {
  None,
  ThreeToFiveYear,
  ThisYear,
  TwelveWeekYear
}

export interface Goal {
  id: string;
  description: string;
  type: GoalTypes;
}


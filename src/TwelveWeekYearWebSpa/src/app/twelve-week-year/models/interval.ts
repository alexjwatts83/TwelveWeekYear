import { Goal } from "src/app/goals/models/goal";

export interface Interval {
  id: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface DaysResult {
  id: string;
  date: Date;
  goal: Goal;
}


import { Goal } from "src/app/goals/models/goal";

export interface DaysResult {
  id: string;
  date: Date;
  goal: Goal;
  notes: string;
  completed: boolean;
}



import { Goal } from "src/app/goals/models/goal";


export interface TwelveWeekYear {
  goals: Goal[];
  start: Date;
  end: Date;
  finalThoughts: string;
}

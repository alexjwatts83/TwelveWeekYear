import { Goal } from "src/app/goals/models/goal";
import { Week, WeekDayResult } from ".";

export interface TwelveWeekYear {
  goals: Goal[];
  weeks: Week[];
  taskResults: WeekDayResult[];
  start: Date;
  end: Date;
  finalThoughts: string;
}

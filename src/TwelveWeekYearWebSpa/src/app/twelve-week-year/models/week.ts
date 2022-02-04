import { WeekDay } from "./week-day";

export interface Week {
  number: number;
  date: Date;
  days: WeekDay[];
}

import { Component, OnInit } from '@angular/core';
import { GoalTypes } from '../goals/models/goal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  threeToFiveYear = {
    heading: '3 to 5 Years',
    type: GoalTypes.ThreeToFiveYear
  };

  thisYear = {
    heading: 'This Year',
    type: GoalTypes.ThisYear
  };

  twelveWeekYear = {
    heading: '12 Week Year Goals',
    type: GoalTypes.TwelveWeekYear
  };

  weeks: any[] = [];

  constructor() {
    let date = new Date();
    for (let i = 0; i < 12; i++) {
      date = this.addDays(date, 7);
      this.weeks.push({
        number: i + 1,
        date: date
      });
      this.weeks[this.weeks.length - 1].days = [];
      for (let j = 0; j < 7; j++) {
        let dayDate = this.addDays(date, j);
        this.weeks[this.weeks.length - 1].days.push({
          date: dayDate,
          comments: `Something on day ${dayDate}`
        });
      }
    }
    console.log({weeks: this.weeks});
  }

  ngOnInit(): void {
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

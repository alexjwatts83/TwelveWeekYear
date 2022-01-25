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
    for (let i = 0; i < 12; i++){
      this.weeks.push({
        number: i + 1
      });
    }
  }

  ngOnInit(): void {
  }

}

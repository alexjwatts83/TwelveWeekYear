import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/app/goals/models';
import { Week, WeekDayResult } from '../../models';

@Component({
  selector: 'app-twelve-week-year-tab',
  templateUrl: './twelve-week-year-tab.component.html',
  styleUrls: ['./twelve-week-year-tab.component.scss']
})
export class TwelveWeekYearTabComponent implements OnInit {
  @Input() week!: Week;
  @Input() goals!: Goal[];
  @Input() taskResults!: WeekDayResult[];

  constructor() { }

  ngOnInit(): void {
  }
}

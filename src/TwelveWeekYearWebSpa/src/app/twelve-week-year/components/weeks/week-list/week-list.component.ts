import { Component, Input, OnInit } from '@angular/core';
import { WeekDay } from "../../../models";

interface WeekDayListItem extends WeekDay {
  showEditor: boolean
}

@Component({
  selector: 'app-week-list',
  templateUrl: './week-list.component.html',
  styleUrls: ['./week-list.component.scss']
})
export class WeekListComponent implements OnInit {
  @Input() days: WeekDay[] = [];

  displayedColumns: string[] = ['date', 'comments'];
  blured = false;
  focused = false;
  data: WeekDayListItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data = this.days.map((d => {
      return {
        ...d,
        showEditor:false
      };
    }))
  }

  blur($event: any, element: any) {
    this.focused = false
    this.blured = true
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { WeekDay } from "../../../models";

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

  constructor() { }

  ngOnInit(): void {
  }

  blur($event: any, element: any) {
    console.log({event: $event, element});
    this.focused = false
    this.blured = true
  }
}

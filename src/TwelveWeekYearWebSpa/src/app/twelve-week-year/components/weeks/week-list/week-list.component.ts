import { Component, Input, OnInit } from '@angular/core';
import { GoalsService } from 'src/app/goals/goals.service';
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

  constructor(private service: GoalsService) { }

  ngOnInit(): void {
  }

  blur($event: any) {
    this.focused = false
    this.blured = true
  }
}

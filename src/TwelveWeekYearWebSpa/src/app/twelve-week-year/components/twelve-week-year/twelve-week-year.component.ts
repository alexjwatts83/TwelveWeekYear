import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TwelveWeekYear, WeekDayResult } from '../../models';
import { TwelveWeekYearService } from '../../twelve-week-year.service';

@Component({
  selector: 'app-twelve-week-year',
  templateUrl: './twelve-week-year.component.html',
  styleUrls: ['./twelve-week-year.component.scss'],
})
export class TwelveWeekYearComponent implements OnInit {
  private _data: TwelveWeekYear | undefined;
  data$!: Observable<TwelveWeekYear>;

  constructor(private service: TwelveWeekYearService) {
    this.data$ = this.service.getTwelveWeekData();
  }

  ngOnInit(): void {
    if (this.data$) {
      this.data$.subscribe((x: TwelveWeekYear) => {
        this._data = x;
      });
    }
  }
}

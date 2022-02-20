import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from './shared/busy-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TwelveWeekYearWebSpa';

  constructor(
    // private spinner: NgxSpinnerService,
    private busyService: BusyService
  ) {}

  ngOnInit() {
    /** spinner starts on init */
    console.log({ngOnInit: true});
    this.busyService.busy();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.busyService.idle();
      console.log({hide: true});
    }, 5000);
  }
}

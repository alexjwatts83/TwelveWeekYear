import { Component, OnInit } from '@angular/core';
import { BusyService } from './shared/busy-service.service';

export interface SiteLink {
  route: string;
  text: string;
  icon: string;
  hideIfAuth: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TwelveWeekYearWebSpa';
  links: SiteLink[] = [
    { 
      route: '/goals/this-year',
      text: 'Current',
      icon: 'calendar_today',
      hideIfAuth: true
    },
    { 
      route: '/goals/three-to-five-year',
      text: '3 to 5',
      icon: 'whatshot',
      hideIfAuth: true
    },
    { 
      route: '/twelve-week-year',
      text: 'Twelve Week Year',
      icon: 'star',
      hideIfAuth: false
    }
  ]
  constructor(
    private busyService: BusyService
  ) {}

  ngOnInit() {
    /** spinner starts on init */
    this.busyService.busy();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.busyService.idle();
    }, 300);
  }
}

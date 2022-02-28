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
      route: '/goals',
      text: 'Goals',
      icon: 'person_add',
      hideIfAuth: true
    },
    // { 
    //   route: '/login',
    //   text: 'Login',
    //   icon: 'input',
    //   hideIfAuth: true
    // },
    // { 
    //   route: '/training',
    //   text: 'Training',
    //   icon: 'directions_run',
    //   hideIfAuth: false
    // }
  ]
  constructor(
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
    }, 1000);
  }
}

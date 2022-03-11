import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    console.log({busy: this.busyRequestCount});
    // this.spinnerService.show(undefined, {
    //   type: 'line-scale-party',
    //   bdColor: 'rgba(255,255,255,0.5)',
    //   color: '#333333',
    //   fullScreen: true
    // });
    this.spinnerService.show();
  
    // this.spinnerService.spinnerObservable.subscribe(c=>{
    //   c.show.
    // });
    // setTimeout(() => {
    //   console.log('finished');
    // }, 3000);
  }

  idle(){
    setTimeout(() => {
      this.busyRequestCount--;
      console.log({idle: this.busyRequestCount});
      if(this.busyRequestCount <=0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
    }, 10);

  }
}

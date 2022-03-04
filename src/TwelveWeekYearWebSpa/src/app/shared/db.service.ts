import { Injectable } from '@angular/core';
import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';
import { SiteLink } from '../app.component';

export abstract class BaseDbService<TKey, TVal> {
  dataMap: Map<TKey, TVal[]> = new Map<TKey, TVal[]>([]);
  rootLevelNodes: TVal[] = [];
  counts: Map<TKey, number> =  new Map<TKey, number>();

  getChildren(node: TKey) {
    // adding delay to mock a REST API call
    let nodes = this.dataMap.get(node);
    return of(nodes);//.pipe(delay(10));
  }

  isExpandable(node: TKey): boolean {
    return this.dataMap.has(node);
  }

  getCount(node: TKey){
    if (this.counts.has(node)) {
      return this.counts.get(node) ?? 0;
    }
    let nodes = this.dataMap.get(node);
    let childrenCount = (nodes != null) ? nodes.length : 0;
    if (!this.counts.has(node)) {
      this.counts.set(node, childrenCount);
    }
    return this.counts.get(node) ?? 0;
  }
}

/*
https://indepth.dev/tutorials/angular/angular-material-nested-menu-dynamic-data
*/
@Injectable({
  providedIn: 'root',
})
export class DbService extends BaseDbService<string, SiteLink> {
  constructor() {
    super();
    
    let goals: SiteLink = {
      route: '/goals/this-year',
      text: 'Goals',
      icon: 'calendar_today',
      hideIfAuth: true,
    };
    let thisYear: SiteLink = {
      route: '/goals/this-year',
      text: 'Current',
      icon: 'calendar_today',
      hideIfAuth: true,
    };
    let threeToFiveYear: SiteLink = {
      route: '/goals/three-to-five-year',
      text: '3 to 5',
      icon: 'whatshot',
      hideIfAuth: true,
    };
    let twelveWeekYearGoals: SiteLink = {
      route: '/goals',
      text: 'Twelve Week Year',
      icon: 'star',
      hideIfAuth: false
    };
    let twelveWeekYear: SiteLink = {
      route: '/twelve-week-year',
      text: 'Twelve Week Year',
      icon: 'star',
      hideIfAuth: false
    };
    let twelveWeekYearCurrent: SiteLink = {
      route: '/twelve-week-year',
      text: 'Current',
      icon: 'star',
      hideIfAuth: false
    };

    this.dataMap = new Map<string, SiteLink[]>([
      ['Goals', [thisYear, threeToFiveYear, twelveWeekYearGoals]],
      ['Twelve Week Year', [twelveWeekYearCurrent]],
    ]);

    this.rootLevelNodes = [goals, twelveWeekYear];
  }
}

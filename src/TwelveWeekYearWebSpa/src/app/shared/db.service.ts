import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SiteLink } from '../app.component';

export abstract class BaseDbService<TKey, TVal> {
  dataMap: Map<TKey, TVal[]> = new Map<TKey, TVal[]>([]);
  rootLevelNodes: TVal[] = [];

  getChildren(node: TKey) {
    // adding delay to mock a REST API call
    return of(this.dataMap.get(node)).pipe(delay(300));
  }

  isExpandable(node: TKey): boolean {
    return this.dataMap.has(node);
  }
}

/*
https://indepth.dev/tutorials/angular/angular-material-nested-menu-dynamic-data
*/
@Injectable({
  providedIn: 'root',
})
export class DbService extends BaseDbService<string, SiteLink> {
  // dataMap = new Map<T, T[]>([
  //   ['Fruits', ['Apple', 'Orange', 'Banana']],
  //   ['Vegetables', ['Tomato', 'Potato', 'Onion']],
  //   ['Apple', ['Fuji', 'Macintosh']],
  //   ['Onion', ['Yellow', 'White', 'Purple']],
  //   ['Macintosh', ['Yellow', 'White', 'Purple']],
  // ]);

  // rootLevelNodes: T[] = ['Fruits', 'Vegetables'];
  /**
   *
   */

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
      ['Goals', [thisYear, threeToFiveYear]],
      ['Twelve Week Year', [twelveWeekYearCurrent]],
    ]);
    this.rootLevelNodes = [goals, twelveWeekYear];
  }

  getChildren(node: string) {
    // adding delay to mock a REST API call
    return of(this.dataMap.get(node)).pipe(delay(1000));
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}

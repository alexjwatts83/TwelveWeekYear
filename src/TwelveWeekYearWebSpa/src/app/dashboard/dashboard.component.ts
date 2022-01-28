import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../goals/goals.service';
import { GoalTypes } from '../goals/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  threeToFiveYear = {
    heading: '3 to 5 Years',
    type: GoalTypes.ThreeToFiveYear,
  };

  thisYear = {
    heading: 'This Year',
    type: GoalTypes.ThisYear,
  };

  twelveWeekYear = {
    heading: '12 Week Year Goals',
    type: GoalTypes.TwelveWeekYear,
  };

  // weeks: Week[] = [];
  // displayedColumns: string[] = ['date', 'comments'];
  // data$!: Observable<Goal[]>;
  // twelveWeekYearGoals: Goal[] = [];
  constructor(private service: GoalsService) {
    // this.data$ = this.service.getGoals(GoalTypes.TwelveWeekYear);
  }

  ngOnInit(): void {
    // this.data$.subscribe((x) => {
    //   this.twelveWeekYearGoals = x;
    //   this.init();
    // });
  }

  // private init() {
  //   let date = new Date();
  //   for (let i = 0; i < 12; i++) {
  //     date = this.addDays(date, 7);
  //     this.weeks.push({
  //       number: i + 1,
  //       date: date,
  //       days: [],
  //       taskComments: []
  //     });
  //     // this.weeks[this.weeks.length - 1].days = [];
  //     for (let j = 0; j < 7; j++) {
  //       let dayDate = this.addDays(date, j);
  //       this.weeks[this.weeks.length - 1].days.push({
  //         date: dayDate,
  //         comments: `Something on day ${dayDate}`
  //       });
  //     }
  //     // this.weeks[this.weeks.length - 1].taskComments = [];
  //     this.twelveWeekYearGoals.forEach(x => {
  //       x.tasks.forEach(t => {
  //         this.weeks[this.weeks.length - 1].taskComments.push({
  //           task: t,
  //           comments: [
  //             `${t.description} - 1`,
  //             `2 - ${t.description}`,
  //           ]
  //         });
  //       });
  //     });
  //   }
  // }

  // private addDays(date: Date, days: number) {
  //   var result = new Date(date);
  //   result.setDate(result.getDate() + days);
  //   return result;
  // }

  // getCommentsForTask(weekDate: Date, taskId: string) : string[] {
  //   let week = this.weeks.find(x => x.date === weekDate);
  //   if (week === undefined) {
  //     return [];
  //   }
  //   let taskComments = week.taskComments.filter(x => x.task.id === taskId);//.map(({ comments }) => comments);
  //   let comments: string[] = [];
  //   taskComments.forEach(t => {
  //     t.comments.forEach(c => {
  //       comments.push(c);
  //     });
  //   });
  //   return comments;
  // }
}

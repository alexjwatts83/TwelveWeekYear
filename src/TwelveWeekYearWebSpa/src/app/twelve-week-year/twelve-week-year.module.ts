import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwelveWeekYearComponent } from './components/twelve-week-year/twelve-week-year.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { TwelveWeekYearWeekListComponent } from './components/twelve-week-year-week-list/twelve-week-year-week-list.component';
import { TwelveWeekYearSubtasksListComponent } from './components/twelve-week-year-subtasks-list/twelve-week-year-subtasks-list.component';
import { TwelveWeekYearTaskCommentsInputComponent } from './components/task-comments/task-comments-input/task-comments-input.component';
import { SharedModule } from '../shared/shared.module';
import { TwelveWeekYearTaskCommentsListComponent } from './components/task-comments/task-comments-list/task-comments-list.component';

@NgModule({
  declarations: [
    TwelveWeekYearComponent,
    TwelveWeekYearWeekListComponent,
    TwelveWeekYearSubtasksListComponent,
    TwelveWeekYearTaskCommentsListComponent,
    TwelveWeekYearTaskCommentsInputComponent,
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule
  ],
  exports: [
    TwelveWeekYearComponent
  ]
})
export class TwelveWeekYearModule { }

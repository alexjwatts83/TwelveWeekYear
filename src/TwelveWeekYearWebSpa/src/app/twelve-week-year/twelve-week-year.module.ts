import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwelveWeekYearComponent } from './components/twelve-week-year/twelve-week-year.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { WeekListComponent } from './components/weeks/week-list/week-list.component';
import { SubtasksListComponent } from './components/subtasks/subtasks-list/subtasks-list.component';
import { CommentsInputComponent } from './components/task-comments/task-comments-input/task-comments-input.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsListComponent } from './components/task-comments/task-comments-list/task-comments-list.component';

@NgModule({
  declarations: [
    TwelveWeekYearComponent,
    WeekListComponent,
    SubtasksListComponent,
    CommentsListComponent,
    CommentsInputComponent,
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

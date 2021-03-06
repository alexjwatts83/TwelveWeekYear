import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwelveWeekYearComponent } from './components/twelve-week-year/twelve-week-year.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { WeekListComponent } from './components/weeks/week-list/week-list.component';
import { SubtasksListComponent } from './components/subtasks/subtasks-list/subtasks-list.component';
import { CommentsInputComponent } from './components/task-comments/task-comments-input/task-comments-input.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsListComponent } from './components/task-comments/task-comments-list/task-comments-list.component';
import { QuillModule } from 'ngx-quill';
import { TwelveWeekYearRoutingModule } from './twelve-week-year-routing.module';
import { FinalThoughtsComponent } from './components/final-thoughts/final-thoughts.component';
import { TwelveWeekYearTabComponent } from './components/twelve-week-year-tab/twelve-week-year-tab.component';
import { SubtasksCardComponent } from './components/subtasks/subtasks-card/subtasks-card.component';

@NgModule({
  declarations: [
    TwelveWeekYearComponent,
    WeekListComponent,
    SubtasksListComponent,
    CommentsListComponent,
    CommentsInputComponent,
    FinalThoughtsComponent,
    TwelveWeekYearTabComponent,
    SubtasksCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    TwelveWeekYearRoutingModule,
    QuillModule.forRoot(),
  ],
  exports: [TwelveWeekYearComponent],
})
export class TwelveWeekYearModule {}

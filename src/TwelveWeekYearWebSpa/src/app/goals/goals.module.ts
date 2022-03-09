import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { GoalsInputComponent } from './goals-input/goals-input.component';
import { SharedModule } from '../shared/shared.module';
import { GoalsGroupComponent } from './goals-group/goals-group.component';
import { TaskListComponent } from './goals-input/task-list/task-list.component';
import { GoalTaskInputComponent } from './goal-task-input/goal-task-input.component';

@NgModule({
  declarations: [
    GoalsGridComponent,
    GoalsInputComponent,
    GoalsGroupComponent,
    TaskListComponent,
    GoalTaskInputComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    MaterialSharedModule,
    SharedModule
  ],
  exports: [
    GoalsGridComponent,
    GoalsInputComponent,
    GoalsGroupComponent
  ]
})
export class GoalsModule { }

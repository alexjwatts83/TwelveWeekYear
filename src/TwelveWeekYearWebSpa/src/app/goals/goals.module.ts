import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { GoalsInputComponent } from './goals-input/goals-input.component';
import { SharedModule } from '../shared/shared.module';
import { GoalsGroupComponent } from './goals-group/goals-group.component';
import { TaskInputComponent } from './goals-input/task-input/task-input.component';
import { TaskListComponent } from './goals-input/task-list/task-list.component';

@NgModule({
  declarations: [
    GoalsGridComponent,
    GoalsInputComponent,
    GoalsGroupComponent,
    TaskInputComponent,
    TaskListComponent
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

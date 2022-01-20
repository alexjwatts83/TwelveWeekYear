import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { GoalsInputComponent } from './goals-input/goals-input.component';

@NgModule({
  declarations: [
    GoalsGridComponent,
    GoalsInputComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    MaterialSharedModule
  ],
  exports: [
    GoalsGridComponent,
    GoalsInputComponent
  ]
})
export class GoalsModule { }

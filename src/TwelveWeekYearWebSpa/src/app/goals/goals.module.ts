import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';
import { MaterialSharedModule } from '../material-shared/material-shared.module';

@NgModule({
  declarations: [
    GoalsGridComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    MaterialSharedModule
  ],
  exports: [
    GoalsGridComponent
  ]
})
export class GoalsModule { }

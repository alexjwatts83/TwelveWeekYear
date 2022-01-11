import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';


@NgModule({
  declarations: [
    GoalsGridComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule
  ],
  exports: [
    GoalsGridComponent
  ]
})
export class GoalsModule { }

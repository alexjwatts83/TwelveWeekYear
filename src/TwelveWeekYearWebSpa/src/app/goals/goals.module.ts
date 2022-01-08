import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';



@NgModule({
  declarations: [
    GoalsGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoalsGridComponent
  ]
})
export class GoalsModule { }

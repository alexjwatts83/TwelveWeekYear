import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsGridComponent } from './goals-grid/goals-grid.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsGridComponent,
  },
  {
    path: 'three-to-five-year',
    component: GoalsGridComponent,
  },
  {
    path: 'this-year',
    component: GoalsGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsRoutingModule {}

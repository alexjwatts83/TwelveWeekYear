import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'twelve-week-year',
    loadChildren: () =>
      import('./twelve-week-year/twelve-week-year.module').then(
        (m) => m.TwelveWeekYearModule
      ),
  },
  {
    path: 'goals',
    loadChildren: () =>
      import('./goals/goals.module').then((m) => m.GoalsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

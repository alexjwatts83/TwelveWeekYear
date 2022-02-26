import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TwelveWeekYearComponent } from ".";

const routes: Routes = [
  {
    path: '',
    component: TwelveWeekYearComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwelveWeekYearRoutingModule { }

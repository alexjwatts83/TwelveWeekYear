import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoalsModule } from './goals/goals.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './material-shared/material-shared.module';
import { TwelveWeekYearModule } from './twelve-week-year/twelve-week-year.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoalsModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    TwelveWeekYearModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

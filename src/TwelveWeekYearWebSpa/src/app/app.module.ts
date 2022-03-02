import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoalsModule } from './goals/goals.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './material-shared/material-shared.module';
import { TwelveWeekYearModule } from './twelve-week-year/twelve-week-year.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { LayoutModule } from './layout/layout.module';

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
    TwelveWeekYearModule,
    HttpClientModule,
    NgxSpinnerModule,
    LayoutModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true,
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

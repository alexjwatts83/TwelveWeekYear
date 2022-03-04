import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialSharedModule,
    RouterModule,
  ],
  exports : [
    HeaderComponent,
  ]
})
export class LayoutModule { }

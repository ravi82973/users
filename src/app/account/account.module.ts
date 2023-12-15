import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { PipesModule } from '../Core/_pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ShorteddataComponent } from './shorteddata/shorteddata.component';
import { MatCheckboxModule } from '@angular/material/checkbox'


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    ShorteddataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    PipesModule,
    MatIconModule,
    ScrollingModule,
    MatCheckboxModule
  ]
})
export class AccountModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftPanelRoutingModule } from './left-panel-routing.module';
import { LeftPanelComponent } from './left-panel.component';


@NgModule({
  declarations: [LeftPanelComponent],
  imports: [
    CommonModule,
    LeftPanelRoutingModule
  ]
})
export class LeftPanelModule { }

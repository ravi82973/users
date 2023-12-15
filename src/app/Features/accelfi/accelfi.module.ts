import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccelfiRoutingModule } from './accelfi-routing.module';
import { AccelfiComponent } from './accelfi.component';


@NgModule({
  declarations: [AccelfiComponent],
  imports: [
    CommonModule,
    AccelfiRoutingModule
  ]
})
export class AccelfiModule { }

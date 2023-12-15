import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccelfiComponent } from './accelfi.component';

const routes: Routes = [{ path: '', component: AccelfiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccelfiRoutingModule { }

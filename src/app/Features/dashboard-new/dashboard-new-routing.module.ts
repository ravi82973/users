import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardNewComponent } from './dashboard-new.component';

const routes: Routes = [{ path: '', component: DashboardNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardNewRoutingModule { }

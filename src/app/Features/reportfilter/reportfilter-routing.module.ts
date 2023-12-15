import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportfilterComponent } from './reportfilter.component';

const routes: Routes = [{ path: '', component: ReportfilterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportfilterRoutingModule { }

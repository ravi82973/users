import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeftPanelComponent } from './left-panel.component';

const routes: Routes = [{ path: '', component: LeftPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeftPanelRoutingModule { }

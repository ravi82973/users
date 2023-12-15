import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridViewComponent } from './grid-view.component';

const routes: Routes = [{ path: '', component: GridViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridViewRoutingModule { }

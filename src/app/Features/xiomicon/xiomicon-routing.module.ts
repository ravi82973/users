import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XiomiconComponent } from './xiomicon.component';

const routes: Routes = [{ path: '', component: XiomiconComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XiomiconRoutingModule { }

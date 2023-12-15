import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobtitleComponent } from './jobtitle.component';

const routes: Routes = [{ path: '', component: JobtitleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobtitleRoutingModule { }

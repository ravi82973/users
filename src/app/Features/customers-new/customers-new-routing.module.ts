import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersNewComponent } from './customers-new.component';

const routes: Routes = [{ path: '', component: CustomersNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersNewRoutingModule { }

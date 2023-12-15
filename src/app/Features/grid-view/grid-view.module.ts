import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridViewRoutingModule } from './grid-view-routing.module';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardModule } from '../dashboard/dashboard.module';


// import { GridViewComponent } from './grid-view.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GridViewRoutingModule,
    NgbModalModule,
    DashboardModule,
    NgbModalModule
  ],
  providers:[NgbActiveModal]
})
export class GridViewModule { }

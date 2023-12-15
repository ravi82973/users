import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TableVirtualScrollModule } from 'ng-cdk-table-virtual-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // TableVirtualScrollModule
    NgxSpinnerModule,
    NgbModalModule
  ],
  providers:[NgbActiveModal]
})
export class DashboardModule { }

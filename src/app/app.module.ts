import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Authentication/login/login.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { HeaderComponent } from './Layout/header/header.component';
import { GridComponent } from './Features/grid/grid.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule} from '@angular-slider/ngx-slider';
import { NgbModalStackModule } from 'ng-bootstrap-modal-stack';
import {GridViewComponent} from './Features/grid-view/grid-view.component'
import { RolesComponent } from './Features/Admin/roles/roles.component';
import { JobtitleComponent } from './Features/Admin/jobtitle/jobtitle.component';
import { AdminModulesComponent } from './Features/Admin/admin-modules/admin-modules.component';
import { ReportfilterComponent } from './Features/reportfilter/reportfilter.component';
import { SortDirective } from './Core/pipes/sort.directive';
import { MessengerComponent} from './Features/messenger/messenger.component';
import { DashboardNewComponent} from './Features/dashboard-new/dashboard-new.component';
import { SentMsgComponent } from './Features/sent-msg/sent-msg.component';
import { XiomiconComponent} from './Features/xiomicon/xiomicon.component';
import { CustomersNewComponent } from './Features/customers-new/customers-new.component';
import { DatepipePipe } from './Core/datepipe.pipe';


// import { TableVirtualScrollModule } from 'ng-cdk-table-virtual-scroll';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
// import { TableVirtualScrollModule } from 'ng-cdk-table-virtual-scroll';
// import {ScrollingModule} from '@angular/cdk/scrolling';
// import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    GridComponent,
    GridViewComponent,
    RolesComponent,
    JobtitleComponent,
    AdminModulesComponent,
    ReportfilterComponent,
    MessengerComponent,
    DashboardNewComponent,
    SentMsgComponent,
    XiomiconComponent,
    CustomersNewComponent,
    SortDirective,
    DatepipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgbModalModule,
    NgbModule,
    NgxSliderModule

    //  ScrollingModule
    // ScrollingModule
    // TableVirtualScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
exports:[NgxSpinnerModule,DashboardComponent, ReportfilterComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModal,NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,


  ],
})
export class HeaderModule { }

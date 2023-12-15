import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobtitleRoutingModule } from './jobtitle-routing.module';
// import { JobtitleComponent } from './jobtitle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobtitleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,

  ]
})
export class JobtitleModule { }

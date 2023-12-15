import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportfilterRoutingModule } from './reportfilter-routing.module';
// import { ReportfilterComponent } from './reportfilter.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule} from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportfilterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSliderModule
  ],
  
  providers:[NgbActiveModal]

})
export class ReportfilterModule { }

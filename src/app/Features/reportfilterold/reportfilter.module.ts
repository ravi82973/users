import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportfilterRoutingModule } from './reportfilter-routing.module';
// import { ReportfilterComponent } from './reportfilter.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportfilterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  
  providers:[NgbActiveModal]

})
export class ReportfilterModule { }

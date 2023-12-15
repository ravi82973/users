import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentMsgRoutingModule } from './sent-msg-routing.module';
import { SentMsgComponent } from './sent-msg.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    SentMsgRoutingModule,
    FormsModule
  ]
})
export class SentMsgModule { }

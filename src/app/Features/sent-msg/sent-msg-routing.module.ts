import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentMsgComponent } from './sent-msg.component';

const routes: Routes = [{ path: '', component: SentMsgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentMsgRoutingModule { }

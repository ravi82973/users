
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtcConvertPipe} from './utcConverter/utc-convert.pipe';

@NgModule({
  declarations: [UtcConvertPipe],
  imports: [
    CommonModule
  ],
  exports:[UtcConvertPipe]
})
export class PipesModule { }


 
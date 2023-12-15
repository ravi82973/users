//LimitCharsPipeModule
import { NgModule } from '@angular/core';
import { UtcConvertPipe } from './utc-convert.pipe';






@NgModule({
	declarations: [UtcConvertPipe],
	exports: [UtcConvertPipe],
	providers: []
})
export class UtcConvertCharsPipeModule { }
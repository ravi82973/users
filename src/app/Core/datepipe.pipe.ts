import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customFormat'
})
export class DatepipePipe implements PipeTransform {

  transform(date: Date | string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'mm-dd-yyyy');
  }

}

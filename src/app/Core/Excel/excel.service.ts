import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-with-styles';
import { ApiServiceService } from '../api-service.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  title : any;

  constructor(private apiSrvc:  ApiServiceService) { }

 public CustomerReportsXLSX(excelID,excelFileName,wscols,wsrows){
    alert("printing excel")
    console.log(excelID);
    // let element = document.getElementById(excelID)
    const worksheet:XLSX.WorkSheet = XLSX.utils.table_to_sheet(excelID);
    worksheet['!cols'] = wscols;
    worksheet['!rows'] = wsrows;
    for ( var i in worksheet){
      console.log('worksheet',worksheet[i]);

    }
    const workbook:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
    XLSX.writeFile(workbook, excelID.id+'.xlsx')
  }
  // SalesReportsXLSX(){
  //   console.log(this.title);
  //   let element = document.getElementById(this.title)
  //   const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //   const wb:XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  //   XLSX.writeFile(wb, this.title+'.xlsx')
  // }
}

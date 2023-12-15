import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  @ViewChild('content', { 'static': false }) content: ElementRef;

  constructor() { }

  printPDF(){
    let printContents, popupWin;
    printContents = document.getElementById('XiomCustomerInsights').innerHTML;
   popupWin = window.open('','_blank', 'top=0,left=0,height=100%,width=auto')
    popupWin.document.open();

    let printHead = document.head.innerHTML;
    popupWin.document.write(`<html>
    <head>
    <title>Print tab</title>
    </head>
    <style>

    @font-face {
      font-family: 'Gotham\ Book\ Regular';
      src: url('assets/fonts/Gotham\ Book\ Regular.otf') format('otf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Gotham\ Book\ Regular.otf') format('opentype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }
    @font-face {
      font-family: 'GothamMedium';
      src: url('assets/fonts/GothamMedium.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/GothamMedium.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }
    @font-face {
      font-family: 'Gotham\ Medium\ Regular';
      src: url('assets/fonts/Gotham\ Medium\ Regular.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Gotham\ Medium\ Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }
    @font-face {
      font-family: 'Gotham\ Bold';
      src: url('assets/fonts/Gotham\ Bold.otf') format('otf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Gotham\ Bold.otf') format('opentype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }
    @font-face {
      font-family: 'Gotham-Light';
      src: url('assets/fonts/Gotham-Light.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Gotham-Light.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }


    @font-face {
      font-family: 'Roboto-Regular';
      src: url('assets/fonts/Roboto-Regular.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Roboto-Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'Roboto-Bold';
      src: url('assets/fonts/Roboto-Bold.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Roboto-Bold.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'Roboto-Medium';
      src: url('assets/fonts/Roboto-Medium.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/Roboto-Medium.ttf') format('truetype');  /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'RobotoCondensed-Bold';
      src: url('assets/fonts/RobotoCondensed-Bold.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/RobotoCondensed-Bold.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'RobotoCondensed-Light';
      src: url('assets/fonts/RobotoCondensed-Light.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/RobotoCondensed-Light.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'RobotoCondensed-Medium';
      src: url('assets/fonts/RobotoCondensed-Medium.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/RobotoCondensed-Medium.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    @font-face {
      font-family: 'RobotoCondensed-Regular';
      src: url('assets/fonts/RobotoCondensed-Regular.ttf') format('ttf'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
           url('assets/fonts/RobotoCondensed-Regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
    }

    .background-image{
      -webkit-print-color-adjust: exact !important;
      background-image: url('/assets/images/bg_.jpg');


    }
    .d-flex {display: flex!important;}
    .row .background-image .search-bar{background-color: white;border-radius: 15px;margin: 0px !important;margin-top: 2rem !important; height: 74px;}
    .row .background-image .search-bar .act-fltr{border-right: 2px solid rgb(204, 201, 201); margin: 0px 0px 10px 0px;width:20%}
    .row .background-image .search-bar .act-fltr .storeLine{line-height: 13px;margin: 0px 0px 0px 10px}
    .row .background-image .search-bar .act-fltr .storecls{color: #585858;font-size: 0.9rem;font-family: "Roboto-Regular";border: none; width: 100%;}
    .row .background-image .search-bar h1{color: black;font-size: 3.3rem;font-family: 'Roboto-Bold';}
    .row .background-image .search-bar p{color: rgb(88, 88, 88);font-size: 1rem;font-family: 'Roboto-Regular';width:200px}
    .row .background-image .search-bar i{font-size: 1.8rem;}
    .row .background-image .search-bar .customer-data{line-height: 13px;margin: 0px 0px 0px -11px;}
    .row .search-bar .dwn-icon{margin-right: -80%;margin-top:-10% }
    .row .background-image .separator{ display:flex;align-items: center;}
    .row .background-image .separator h6{font-family: 'Roboto-Regular';font-size: 0.8rem;}
    .row .background-image .separator .button{ background-color: #ddd;border: none;color: black;text-align: center;text-decoration: none;display: inline-block;cursor: pointer;padding: 5px 10px;}
    .row .background-image .separator .btn-lft{border-radius: 50px 0 0 50px;}
    .row .background-image .separator .btn-lftopt{border-radius: 50px 0 0 50px;opacity: 0.4;}
    .row .background-image .separator .btn-ryt{border-radius: 0 50px 50px 0;};
    .row .background-image .separator .btn-rytopt{border-radius: 0 50px 50px 0;;opacity: 0.4;}
    .row .background-image .separator .fa{color: #329ce4;}
    .row .background-image .separator .fa-bars{color: white;}
    .row .background-image .separator .line{height: 2px; flex: 1;  background-color: white;}

    .row .background-image .down{transform: rotate(45deg);-webkit-transform: rotate(45deg);}
    .row .background-image .rating{width: 20%;}
    .row .background-image .rating ._chineseblack{ border-bottom: 6px solid #0c0d0f ;}
    .row .background-image .rating ._lavendergray{ border-bottom: 6px solid #c7c7c7 ;}
    .row .background-image .rating ._metallicgreen{ border-bottom: 6px solid #3f6b06 ;}
    .row .background-image .rating ._harvestgold{ border-bottom: 6px solid #ce9000 ;}
    .row .background-image .rating ._robinblue{ border-bottom: 6px solid #3f74b5 ;}
    .row .background-image .rating .rt_hd{background-color: #d4dee7 ; border-radius: 10px 10px 0px 0px;padding: 0.5rem;display: flex;justify-content: center;align-items: center;}
    .row .background-image .rating .rt_hd  h6{ color: #0c1423; font-family: 'Roboto-Medium';font-size:0.9rem;margin: 0;padding: 0;}
    .row .background-image .rating .rt_bd{background-color: #ffffff;border-radius:0px 0px 10px 10px;padding: 0.5rem;height: 120px;display: flex;justify-content: center;align-items: center;position: relative;}
    .row .background-image .rating .rt_bd h5{color: #0c1423; font-family: 'RobotoCondensed-Bold'; font-size:2.2rem; display: flex; justify-content: space-between; align-items: center; margin: 0;padding: 0;margin-top: -10px;}
    .row .background-image .rating .rt_bd a{color: #0f89ee;text-decoration: none; font-size: 0.8rem;font-family: 'Roboto-Medium';  position: absolute;bottom:6px;}
    .row .background-image .type{ width: 20%;}
    .row .background-image .type .typ_hd{background-color: #8da0b1; border-radius: 10px 10px 0px 0px;padding: 0.5rem;display: flex;justify-content: center;align-items: center;white-space: nowrap}
    .row .background-image .type .typ_hd  h6{ color: #fbfdff; font-family: 'Roboto-Regular';font-size:0.9rem;margin: 0;padding: 0;}
    .row .background-image .type .typ_bd{background-color: #ffffff;border-radius:0px 0px 10px 10px;padding: 0.5rem;height: 100px;display: flex;justify-content: center;align-items: center;position: relative;}
    .row .background-image .type .typ_bd h5{ color: #0c1423;font-family: 'RobotoCondensed-Regular';font-size:2.2rem;display: flex;justify-content: space-between; align-items: center; padding: 0; margin-top: -10px;}
    .row .background-image .type .typ_bd h4{font-family: 'Roboto-Medium';font-size: 1rem;color: #3e4042;}
    .row .background-image .type .typ_bd a{color: #0f89ee;text-decoration: none; font-size: 0.8rem;font-family: 'Roboto-Medium';position: absolute;bottom: 6px;}
    .row .background-image .type .typ_bd .Gender{ margin-top: -10%;}


    .background-images{
      -webkit-print-color-adjust: exact !important;
      background-image: url('/assets/images/bg_.jpg');


    }
    .row .background-images .search-bar{background-color: white;border-radius: 15px;margin: 0px !important;margin-top: 2rem !important; height: 74px;}
    .row .background-images .search-bar .act-fltr{border-right: 2px solid rgb(204, 201, 201); margin: 0px 0px 10px 0px;width:20%}
    .row .search-bar .search{border: 1px solid #00000026;border-radius:10px;width:30%;font-family: 'Roboto-Regular';margin-left: 70%;margin-top:-5% }
    .row .search-bar .down_icon{margin-right: -30%;margin-top:-12% }
    .row .background-images .auto_w .scroll_grid{ overflow:hidden;height:auto }
    .row .background-images .auto_w .customer-profile{width:20%}

    .row .background-images .auto_w .customer-profile .custm-card{border-radius: 15px; background: #ffffff;color: #0a0c0f; margin:1rem 0; height: 336px; width:108%}
    .row .background-images .auto_w .customer-profile .custm-card .custm-head .star{ width: 20%;display: flex; align-items: center;justify-content: center;}
    .row .background-images .auto_w .customer-profile .custm-card .custm-head .star img{margin: 0rem;}
    .row .background-images .auto_w .customer-profile .custm-card .custm-head .star .filled{color: white;}
    .row .background-images .auto_w .customer-profile .custm-card .custm-head .star .notfilled{color:#ffffffb0;}
    .row .background-images .auto_w .block-img{ width: 50px;height: 50px; border-radius: 50%}

    .row .background-images .auto_w .xiom-prof-tbl{ text-align: center; max-height:50000px;overflow:hidden}
    .row .background-images .auto_w .xiom-prof-tbl tr:first-child th:nth-child(1){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl tr:last-child th:nth-child(4){border-right: 1px solid #af9f9f; }
    .row .background-images .auto_w .xiom-prof-tbl tr:first-child th:nth-child(2){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl tr:last-child th:nth-child(7){border-right: 1px solid #af9f9f; }
    .row .background-images .auto_w .xiom-prof-tbl tr:first-child th:nth-child(3){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl tr:last-child th:nth-child(11){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl tr:first-child th:nth-child(4){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl tr:last-child th:nth-child(14){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl table{ width: 100%; }
    .row .background-images .auto_w .xiom-prof-tbl table, td, th {border-collapse: collapse;font-size: 12px; white-space: nowrap;text-align:center}
    .row .background-images .auto_w .xiom-prof-tbl table tr th{ font-family: 'Roboto-Regular';padding: 3px 8px; font-weight: lighter;color:#af9f9f !important;}
    .row .background-images .auto_w .xiom-prof-tbl table tr th span{font-family: 'Roboto-Bold' !important; color: #0c0d0f !important;}
    .row .background-images .auto_w .xiom-prof-tbl table td {font-family: 'Roboto-Regular';padding: 5px 6px}
    .row .background-images .auto_w .xiom-prof-tbl table thead {background: #ffffff;position: sticky;z-index: 5 ;top:0;box-shadow: inset 0 -3px 0 #33b3f3;}
    .row .background-images .auto_w .xiom-prof-tbl table thead tr:last-child th:nth-child(-n+3){box-shadow: inset 0 -3px 0 #33b3f3;font-family: 'Roboto-Regular' !important; font-weight: normal;}
    .row .background-images .auto_w .xiom-prof-tbl table thead tr:first-child th:first-child { border-radius: 15px 0 0 0;font-family: 'Roboto-Regular'}
    .row .background-images .auto_w .xiom-prof-tbl table thead tr:first-child th:last-child { border-radius: 0 15px 0 0;font-family: 'Roboto-Regular'}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr:nth-child(odd){background: #ffffff;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr:nth-child(even){background: #f3f6fb;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:nth-child(3){color: #33b3f3 !important;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:last-child{color: #33b3f3 !important;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:nth-child(4){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:nth-child(7){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:nth-child(11){border-right: 1px solid #af9f9f;}
    .row .background-images .auto_w .xiom-prof-tbl table tbody tr td:nth-child(14){border-right: 1px solid #af9f9f}



    </style>

    ${printHead} <body onload="window.print();">${printContents}</body></html>`);
    popupWin.document.close();
  }
}

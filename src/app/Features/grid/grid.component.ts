import { Component, HostListener, ElementRef,OnInit } from '@angular/core';

import { ApiServiceService } from '../../../app/Core/api-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router'
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  customersList: any = [];
  searchText: any;
  validationErrorMsg: any;
  FinalExp: any;
  // Dealership
  storesList: any = [];
  dealerExp: any = [];

  // Score
  scoreFrom: any = '';
  scoreTo: any = '';

  // Sales
  salesFrom: any = '';
  salesTo: any = '';

  // Services
  servicesFrom: any = '';
  servicesTo: any = '';

  //  Brands
  brandsList: any = [];
  brandsExp: any = [];
  brandValue: any = 0;

  // Proximity
  proximityValue: any = 0;

  // Vehicle Equity
  VehicleEquityValue: any = 0;

  // Intraction Freequency
  interactionFreqvalue: any = 0;
  clicked: boolean=true;
  isNoRec: boolean=false;
  // filterblock=true
     
  constructor(private api: ApiServiceService, private spinner: NgxSpinnerService, private Router: Router) { }

  ngOnInit(): void {
    this.clicked=true
    this.FinalExp = "CVP_DealTotalGross !=0 and UCSD_SALES > 0 and UC_FirstName !=''"
    const id = 0
    this.dealerExp.push(id.toString())
    this.customerData();
    this.dealerData(); 
    this.brandsData();
    this.brandsList = [
      { "id": "1", "name": "Audi", "status": true },
      { "id": "2", "name": "Honda", "status": false },
      { "id": "3", "name": "Toyota", "status": false },
    ]
    // console.log(this.dealerExp)
  }

  customerData() {
    this.spinner.show()
    const obj = {
      "Expression": this.FinalExp
    }
    // console.log(obj)
    this.api.postmethod('customersdata/get', obj).subscribe(res => {
      if (res.status == 200) {
        this.customersList = res.response.Details.CustomerDetails
        if(this.customersList.length>0){
          this.isNoRec=true
        }
        // console.log(this.customersList)
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }
 
  dealerData() {
    const obj = {}
    this.api.postmethod('dealerships/get', obj).subscribe(res => {
      if (res.status == 200) {
        this.storesList = res.response
        const obj = {
          "cora_acct_id": 0,
          "DealerShipId": "0",
          "DealerShipName": "All",
          "Status": "true"
        }
        this.storesList.unshift(obj);       
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  brandsData() {
    const obj = {}
    this.api.postmethod('brands/get', obj).subscribe(res => {
      if (res.status == 200) {
        this.brandsList = res.response
         }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  dealerlist(e, val) {
    if (e.target.checked) {
      val.Status = "true"
      this.dealerExp.push(val.DealerShipId.toString())
      if (val.DealerShipId != '0') {
        this.storesList[0].Status = "false";
        let index = this.dealerExp.indexOf('0')
        if (index >= 0)
          this.dealerExp.splice(this.dealerExp.indexOf('0'), 1);
      }
      if (val.DealerShipId == '0') {
        this.dealerExp = []
        this.dealerExp.push(val.DealerShipId.toString());
        this.storesList.forEach(ele => {
          if (ele.DealerShipId != '0') {
            ele.Status = "false"
          }
        });
      }
    }
    else {
      this.dealerExp.splice(this.dealerExp.indexOf(val.DealerShipId), 1);
      val.Status = "false";
    }
    // console.log(this.dealerExp)
    // console.log(this.storesList)
  }
  scoresalesservice(e, val, sec) {

    // if (sec == 'score') {
    //   // console.log('From ----', this.scoreFrom, 'To------', this.scoreTo)
    //   if (parseInt(this.scoreTo) < parseInt(this.scoreFrom) || parseInt(this.scoreTo) == parseInt(this.scoreFrom)) {
    //     document.getElementById("validation").click();
    //   }
    //   else if (parseInt(this.salesTo) < parseInt(this.salesFrom) || parseInt(this.servicesTo) < parseInt(this.servicesFrom)) {
    //     document.getElementById("validation").click();
    //   }
    // }

    // else if (sec == 'sales') {
    //   // console.log('From ----', this.salesFrom, 'To------', this.salesTo)
    //   if (parseInt(this.salesTo) < parseInt(this.salesFrom) || parseInt(this.salesTo) == parseInt(this.salesFrom)) {
    //     document.getElementById("validation").click();
    //   }
    //   else if (parseInt(this.scoreTo) < parseInt(this.scoreFrom) || parseInt(this.servicesTo) < parseInt(this.servicesFrom)) {
    //     document.getElementById("validation").click();
    //   }
    // }

    // else if (sec == 'service') {
    //   // console.log('From ----', this.servicesFrom, 'To------', this.servicesTo)
    //   if (parseInt(this.servicesTo) < parseInt(this.servicesFrom) || parseInt(this.servicesTo) == parseInt(this.servicesFrom)) {
    //     document.getElementById("validation").click();
    //   }
    //   else if (parseInt(this.scoreTo) < parseInt(this.scoreFrom) || parseInt(this.salesTo) < parseInt(this.salesTo)) {
    //     document.getElementById("validation").click();
    //   }
    // }


  }


  fullHistory(customerdetails) {
    // const custDetails=customerdetails.UC_ID
    localStorage.setItem('customerID', customerdetails.UC_ID)
    this.Router.navigate(['/customerdata'])
  }

  apply(e) {
    if(window.screen.width<1366){
      this.clicked=false
    }
      if ((this.scoreTo != '' && this.scoreFrom == '') || (this.scoreTo == '' && this.scoreFrom != '') ||
      (this.salesTo != '' && this.salesFrom == '') || (this.salesTo == '' && this.salesFrom != '') ||
      (this.servicesFrom != '' && this.servicesTo == '') || (this.servicesFrom == '' && this.servicesTo != '') ||
      (parseInt(this.scoreTo) < parseInt(this.scoreFrom)) || (parseInt(this.scoreTo) == parseInt(this.scoreFrom)) ||
      (parseInt(this.salesTo) < parseInt(this.salesFrom)) || (parseInt(this.salesTo) == parseInt(this.salesFrom)) ||
      (parseInt(this.servicesTo) < parseInt(this.servicesFrom)) || (parseInt(this.servicesTo) == parseInt(this.servicesFrom))) {
      document.getElementById("validation").click();
    }
    else {
      // this.gotoTop()

      this.FinalExp = "CVP_DealTotalGross !=0 and UCSD_SALES > 0 and UC_FirstName !=''"
      if (this.dealerExp.length > 0 && this.dealerExp[0] != '0') {
        this.FinalExp = this.FinalExp + " and  CVP_RelatedStores in (" + this.dealerExp.map(a => JSON.stringify(a)).join() + ")"
        this.FinalExp = this.FinalExp.replaceAll('"', "'")
        // alert(this.FinalExp)
      }
      if (this.scoreFrom != '' && this.scoreTo != '') {
        this.FinalExp = this.FinalExp + " and UCSD_SALES between " + "'" + this.scoreFrom + "'" + " and " + "'" + this.scoreTo + "'"
        // alert(this.FinalExp)
      }
      if (this.salesFrom != '' && this.salesTo != '') {
        this.FinalExp = this.FinalExp + " and CVP_TotalPrice between "+  this.salesFrom + " and " +  this.salesTo + ""
      }
      if (this.servicesFrom != '' && this.servicesTo != '') {
        this.FinalExp = this.FinalExp + " and CVP_TotalPrice between convert(decimal(10,2), "+  this.servicesFrom + ") and convert(decimal(10,2)," +  this.servicesTo + ")";
      }
      if (this.brandValue != 0) {
        this.FinalExp = this.FinalExp 
        // alert(this.FinalExp)
      }
      if (this.proximityValue != 0) {
        this.FinalExp + this.FinalExp 
      }
      if (this.VehicleEquityValue != 0) {
        this.FinalExp + this.FinalExp 
      }
      if (this.interactionFreqvalue != 0) {
        this.FinalExp + this.FinalExp 
      }
      e.scrollTop = 0;
      this.customerData();
    }
  }
  clear(val,el) {
    if (val == 'All' || val == 'D') {
      const id = '0'
      this.dealerExp = [];
      this.dealerExp.push(id.toString())
      this.storesList.forEach(ele => {
        if (ele.DealerShipId != '0') {
          ele.Status = "false"
        }
        if (ele.DealerShipId == '0') {
          ele.Status = "true"
        }
      });
    }
    if (val == 'All' || val == 'SC') {
      this.scoreTo = ''
      this.scoreFrom = ''
    }
    if (val == 'All' || val == 'SL') {
      this.salesFrom = ''
      this.salesTo = ''
    }
    if (val == 'All' || val == 'SR') {
      this.servicesTo = ''
      this.servicesFrom = ''
    }
    if (val == 'All' || val == 'BD') {
      this.brandValue = 0
    }
    if (val == 'All' || val == 'P') {
      this.proximityValue = 0
    }
    if (val == 'All' || val == 'VE') {
      this.VehicleEquityValue = 0
    }
    if (val == 'All' || val == 'IF') {
      this.interactionFreqvalue = 0
    }

    this.apply(el);
  }

  closeFilter(){
  //  this.filterblock=false
  }
  filterToggle($event){
    if(window.screen.width<1366){
      this.clicked=true
    }
  }
}

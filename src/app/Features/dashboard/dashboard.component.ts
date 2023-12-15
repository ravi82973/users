import { Component, OnInit, ChangeDetectionStrategy,ViewChild } from '@angular/core';

import { Router } from '@angular/router'
import { ApiServiceService } from '../../../app/Core/api-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  isShow = false;

  custDetails: any;
  custOfferHistory: any =[];
  custScoreCount: any =[];
  custVehicle: any=[];
  custPurchaseHistory: any =[];
  custServiceHistory: any=[];
  currentRate = 2.6;
  constructor(private Router: Router,
              private api: ApiServiceService,
              private spinner:NgxSpinnerService,
              private ngbModal: NgbModal) { }
  ngOnInit(): void {

    this.customerDetails()
  }

  toggleStatus() {
    this.isShow = !this.isShow;
  }
  backtolist(){
    this.Router.navigate(['customerslist'])
  }
  customerDetails(){
    this.spinner.show()
    const obj={
       "cusId": localStorage.getItem('customerID')
      //"cusId": '4083'

  }
  this.api.postmethod('customersdata/customerfulldata',obj).subscribe(res=>{
    if(res.status==200){
      console.log(res)
     this.spinner.hide()
     this.custDetails=res.response.CustomerDetails.Details;
     if(res.response.CustomerDetails.OfferHistory != undefined){
      this.custOfferHistory=res.response.CustomerDetails.OfferHistory;
     }
     if(res.response.CustomerDetails.ScoreCount != undefined){
      this.custScoreCount=res.response.CustomerDetails.ScoreCount;
      this.currentRate=this.custScoreCount[0].starCount
     }
     if(res.response.CustomerDetails.VehicleInfo != undefined){
      this.custVehicle=res.response.CustomerDetails.VehicleInfo[0].Vehicle;
     }
     if(res.response.CustomerDetails.PurchaseHistory != undefined){
      this.custPurchaseHistory=res.response.CustomerDetails.PurchaseHistory[0].PurchaseDetails;
     }
     if(res.response.CustomerDetails.ServiceHistory != undefined){
      this.custServiceHistory=res.response.CustomerDetails.ServiceHistory[0].ServiceDetails;
     }

     }
   },
   (error) => {
    console.log(error);
   }
   )
  }
  closeResult:any;
  modalOptions: NgbModalOptions;

  popup(content){
    this.ngbModal.open(content, this.modalOptions).result.then(()=>{
      this.closeResult=`Closed with $(result)`;
    })
  }
}

import { Component, HostListener, ElementRef,OnInit, ViewChild,Renderer2 } from '@angular/core';

import { ApiServiceService } from '../../../app/Core/api-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router'

import * as $ from 'jquery';
import {NgbModal, NgbModalOptions,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelService} from '../../Core/Excel/excel.service';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
// import { NgbModalSecondary} from 'ng-bootstrap-modal-stack'


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {



  customersList: any = [];
  searchText: any='';
  checkboxStatus: any;
  validationErrorMsg: any;
  FinalExp: any;
  FilterExp: any;
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

  salesScoreFrom :any='';
  salesScoreTo :any='';

  serviceScoreFrom :any=''
  serviceScoreTo :any='';

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
  block: boolean;
  grid: boolean;
  // filterblock=true

  //single data
  isShow = false;

  custDetails: any=[];
  custOfferHistory: any =[];
  custScoreCount: any =[];
  custVehicle: any=[];
  custPurchaseHistory: any =[];
  custServiceHistory: any=[];
  currentRate = 2.6;

  stores = [];
  newCustomer=[]
storesData : any = [];
activeFiltersCount:number=0;
PageCount :number=0;
  totalRecordsCount: any=0;
  title:string="Xiom-Customers";
  StoreName:any=[];
  BrandName:any=[];
  SaleCount:any=[];
  LTVCount:any=[];
  ServiceCount:any=[];
  newStoreArray:any=[];
  newbrandList : any =[];
  SalesScoreCount :any =[];
  ServiceScoreCount :any =[];


  classToggled = false;
  toggle=false;
  isDisabled:any;
  LTVSBoolean=false;
  SalesBoolean=false;
  ServiceBoolean=false;
  SaleScoreBoolean= false;
  ServiceScoreBoolean=false;
  searchForm:FormGroup;
  FromDashboard:any='N';
  upIcon:boolean=true;
downIcon:boolean=false;
  activeFilterExpression: any;
  RowCount: any=100;
  brandString:any='';
  storeString:any ='';
  LTVScoreString:any='';
  SalesScoreString:any='';
  ServiceScoreString:any='';
  SalesValueString;any='';
  ServiceValueString :any='';
  filterlist:any=[];
  closelist:boolean=false;
  customernamelist:any=[];



  // deal details
  VehicleInfo:any=[];
  VehicleName:any=[];
  Address:any=[];
  dealNumber:any;
  Opacity: any = 'N';
  CityZip:any=[];
  CityState:any=[];


  // Service info
  ServInfo:any=[];
  RoDetails:any=[];
  hide:boolean;
  RoValue:any;
  purchaseButton:boolean=false;
  custHistButton:boolean=false;

  rowsToShow:any = 3;


  selectedFromDate: any;
  selectedToDate:any

  @ViewChild('TABLE',{static: false}) TABLE: ElementRef;

  constructor(private api: ApiServiceService,
              private spinner: NgxSpinnerService,
              private Router: Router,
              private ngbModal: NgbModal,

              private Active: NgbActiveModal,
              private fB: FormBuilder,
              private excelSrv : ExcelService,
              private renderer:Renderer2
              ) {
    this.api.getTitle(this.title);
    this.searchForm = this.fB.group({
      searchText: [''],

    });

    this.renderer.listen('window', 'click', (e: Event) => {

      const TagName = e.target as HTMLButtonElement;

      console.log(TagName.className);

      if (TagName.className === 'd-block fade modal show' ) {

        this.Opacity = 'N';

      }

    });


  // alert("enter")


  }

  ngOnInit(): void {


    //localStorage.setItem('Fromview', "N");

    this.activeFiltersCount =0;
    this.clicked=true
    this.block=true;
    if(this.AllowOnlyNumbers(this.searchForm.value.searchText) == true)
    this.FinalExp = "((UC_Phone1 like '%"+this.searchForm.value.searchText.replace('-','')+"%') or (UC_Email like '%"+this.searchForm.value.searchText.replace('-','')+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchForm.value.searchText.replace('-','')+"%'))"
     else
    this.FinalExp = "((UC_Phone1 like '%"+this.searchForm.value.searchText+"%') or (UC_Email like '%"+this.searchForm.value.searchText+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchForm.value.searchText+"%'))"


    const id = 0
    this.dealerExp.push(id.toString())


  if(localStorage.getItem("Fromview")== "N")
       this.getCustomersInitialData();

  this.api.getStoreData().subscribe((data=>{
    //console.log(data);
    this.storesData = data;
  //  this.customerData(this.FinalExp);


  }))

  // this.isFirstPopupOpen=false;

  }
  ngAfterViewInit():void{

    this.activeFiltersCount =0;
    this.api.getFilterExpression().subscribe(data=>{
      if(data.exp!='' && data.exp != undefined){
        this.customersList=[];
        this.FinalExp = data.exp;
        this.activeFiltersCount = data.filterCnt;
        this.activeFilterExpression = data.FilterValues;
        this.RowCount = data.RowCount;
        console.log(" After Viewinit "+this.FinalExp);


        this.customerData(this.FinalExp);


      }

    });

    this.api.getRetainData().subscribe(res=>{
      //console.log('getScore',res);
      if(res != undefined){
        this.scoreFrom = res.scoreFrom;
      //this.scoreTo = res.scoreTo;

      }


    })


  }



  FromDateChange() {
    console.log('from',this.selectedFromDate);
    // Add your logic here to handle the selected date
  }

  ToDateChange(){
    console.log('To',this.selectedToDate);

  }
  purchaseToggle(){
    this.purchaseButton=!this.purchaseButton;

  }
  custHistoryToggle(){
    this.custHistButton=!this.custHistButton;
  }
  storeListName(){
    this.api.getStoreList().subscribe((res:any)=>{
      console.log(res);
      this.StoreName=res;
    ;

    })
    console.log(this.StoreName);

  }

  BrandListName(){
    this.api.getBrandList().subscribe((res:any)=>{
      console.log('brandNameList',res);
      this.BrandName=res.response;

    })
  }



getStoreCheck(event,val){
 // console.log('event',this.customersList);

 // let removeString ='';
let final = this.FinalExp;


this.api.getStoreData().subscribe(res =>{
console.log(res);
this.newStoreArray = res.data;
})

this.api.getBrandList().subscribe(res=>{
console.log('brandVal',res);
this.newbrandList = res

})

this.api.getRetainData().subscribe(res=>{
  console.log('getScore',res);
  if(res != undefined){
  this.scoreFrom = res.scoreFrom;
  this.salesScoreFrom = res.salesScoreFrom;
  this.salesScoreTo = res.salesScoreTo;
  this.serviceScoreFrom = res.serviceScoreFrom;
  this.serviceScoreTo = res.serviceScoreTo;
  // this.scoreTo = res.scoreTo;
  this.salesFrom = res.salesValueFrom;
  this.salesTo = res.salesValueTo;
  this.servicesFrom = res.serviceValueFrom;
  this.servicesTo = res.ServiceValueTo;
  }


})


  console.log('value',val);

  this.storeString ='';
  if(event.target.checked == true)
  {


    this.newStoreArray.push(parseInt(val.CVP_RelatedStores[0]))

    let final1 = final.split( ' and ');

    for(var i=0;i<final1.length; i++)
    {
       if(final1[i].includes("CVP_RelatedStores"))
           this.storeString = final1[i];
    }

    let storeFinal ='';
     if(this.storeString !=''){
         storeFinal =final.replaceAll(' and '+this.storeString,'');

      final = storeFinal+(" and CVP_RelatedStores in ('"+this.newStoreArray.join(",")+"') ");
     }
     else{
      final = final+(" and CVP_RelatedStores in ('"+this.newStoreArray.join(",")+"') ");
     }
    // if(this.brandString !='')
    //   final =final+(' and '+this.brandString);
    this.FinalExp = final;
      console.log(final);
      this.customerData(final)

    val.isChecked=true;
    val.Status = "Exclude"
    if(event.checked){
      val.isChecked=false;
      val.Status = "Exclude";
      this.StoreName.push(val);
    }
    this.storeString ='';
    console.log(this.StoreName);
    console.log('val',val);


  }
  else
  {
      let el = this.newStoreArray.find(itm => itm == val.CVP_RelatedStores[0])
      console.log(el);
      if(el)
      {
        this.newStoreArray.splice(this.newStoreArray.indexOf(el),1);


        let final1 = final.split( ' and ');

        for(var i=0;i<final1.length; i++)
        {
           if(final1[i].includes("CVP_RelatedStores"))
               this.storeString = final1[i];
        }

        let finalString ='';
        if(this.newStoreArray.length > 0){
          let storeFinal =final.replaceAll(' and '+this.storeString,'');
          finalString = storeFinal+(" and CVP_RelatedStores in ('"+this.newStoreArray.join(",")+"') ");
          }
        else  if(this.newStoreArray.length == 0)
           finalString = final.replaceAll(' and '+this.storeString,'');
        //let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))

        this.FinalExp = finalString;
        console.log(final);
        this.customerData(finalString)

      }

      val.isChecked=false;
      val.Status = "Include"
      if(event.checked){
        val.isChecked=true;
        val.Status = "Include";
        this.StoreName.push(val);
      }
      console.log(this.StoreName);
      console.log('val',val);
  }



}


getbrandCheck(event,val){

  //let brandRemoveString ='';
 // console.log('event',this.customersList);

let final = this.FinalExp

this.api.getBrandList().subscribe(res=>{
console.log('brandVal',res);
this.newbrandList = res

})

this.api.getStoreData().subscribe(res =>{
console.log(res);
this.newStoreArray = res.data;
})

this.api.getRetainData().subscribe(res=>{
  console.log('getScore',res);
  if(res != undefined){
  this.scoreFrom = res.scoreFrom;
  // this.scoreTo = res.scoreTo;
  this.salesScoreFrom = res.salesScoreFrom;
  this.salesScoreTo = res.salesScoreTo;
  this.serviceScoreFrom = res.serviceScoreFrom;
  this.serviceScoreTo = res.serviceScoreTo;

  this.salesFrom = res.salesValueFrom;
  this.salesTo = res.salesValueTo;
  this.servicesFrom = res.serviceValueFrom;
  this.servicesTo = res.ServiceValueTo;
  }


})


  if(event.target.checked == true)
  {
    this.newbrandList.push({
      "brand_name": val.Brand[0],
      "brand_chrome_id": val.CVP_Brand[0]
  })
    console.log(this.newbrandList);

    let final1 = final.split( ' and ');

    for(var i=0;i<final1.length; i++)
    {
       if(final1[i].includes("CVP_Brand"))
           this.brandString = final1[i];
    }

    let brandFinal ='';
     if(this.brandString !=''){
         brandFinal =final.replaceAll(' and '+this.brandString,'');


        final = brandFinal+(" and CVP_Brand in ("+this.newbrandList.map(b=>b.brand_chrome_id).join(",")+") ");
     }
     else{
      final = final+(" and CVP_Brand in ("+this.newbrandList.map(b=>b.brand_chrome_id).join(",")+") ");;
     }


    console.log(final);
    this.FinalExp = final;
    this.customerData(final)
    val.isChecked=true;
    val.Status = "Exclude"
    if(event.checked){
      val.isChecked=false;
      val.Status = "Exclude"
      this.BrandName.push(val);
    }
    this.brandString ='';
    console.log(this.BrandName);
    console.log('val',val);
  }

  else
  {
      let el = this.newbrandList.find(itm => itm.brand_chrome_id == val.CVP_Brand)
      console.log('brand',el);

      if(el)
      {
        this.newbrandList.splice(this.newbrandList.indexOf(el),1);


      this.brandString ='';
      let final1 = final.split( ' and ');

      for(var i=0;i<final1.length; i++)
      {
         if(final1[i].includes("CVP_Brand"))
         this.brandString = final1[i];
      }

      let finalString ='';
      if(this.newbrandList.length > 0){
        let brandFinal =final.replaceAll(' and '+this.brandString,'');
        finalString = brandFinal+(" and CVP_Brand in ("+this.newbrandList.map(b=>b.brand_chrome_id).join(",")+") ");
        }
      else  if(this.newbrandList.length == 0)

       finalString = final.replaceAll(' and '+this.brandString,'');
     // let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))
      this.FinalExp = finalString;

        console.log(final);
        this.customerData(finalString)

      }



      val.isChecked=false;
      val.Status = "Include"
      if(event.checked){
        val.isChecked=true;
        val.Status = "Include";
        this.BrandName.push(val);
      }
      console.log(this.BrandName);
      console.log('value',val);

  }



}

  //LTV score
  getLTVScoreCheck(event,val){

  this.api.getRetainData().subscribe(res=>{
    console.log('getScore',res);
    if(res != undefined){
      this.scoreFrom = res.scoreFrom;
    //this.scoreTo = res.scoreTo;
    if(res.salesValueFrom  != undefined)
    this.salesFrom = res.salesValueFrom;
if(res.salesValueTo != undefined)
this.salesTo = res.salesValueTo;

if(res.serviceValueFrom != undefined)
this.servicesFrom = res.serviceValueFrom;
if(res.ServiceValueTo != undefined)
this.servicesTo = res.ServiceValueTo;

if(res.salesScoreFrom != undefined)
  this.salesScoreFrom = res.salesScoreFrom;
  if(res.salesScoreTo != undefined)
    this.salesScoreTo = res.salesScoreTo;
 if(res.serviceScoreFrom != undefined)
    this.serviceScoreFrom = res.serviceScoreFrom;
   if(res.serviceScoreTo != undefined)
     this.serviceScoreTo = res.serviceScoreTo;


    }


  })

  this.api.getStoreData().subscribe(res =>{
    console.log(res);
    this.newStoreArray = res.data;
    })

    this.api.getBrandList().subscribe(res=>{
    console.log('brandVal',res);
    this.newbrandList = res

    })

  let final = this.FinalExp;

    if(event.target.checked == true){


     final = final+(' and '+this.LTVScoreString);

     val.isChecked=true;
     val.Status = "Exclude"
     if(event.checked){
       val.isChecked=false;
       val.Status = "Exclude"
       //this.BrandName.push(val);
     }

     this.FinalExp = final;
      console.log('get',final);
      this.customerData(final);
      this.LTVScoreString='';

      this.LTVSBoolean=!this.LTVSBoolean;
      console.log('disable',this.LTVSBoolean);

    }
    else{




      this.LTVScoreString ='';
        let final1 = final.split( ' and ');

        for(var i=0;i<final1.length; i++)
        {
           if(final1[i].includes("UCSD_LTV"))
               if(this.LTVScoreString == '')
                this.LTVScoreString = this.LTVScoreString+final1[i];
               else
                this.LTVScoreString = this.LTVScoreString+ ' and '+final1[i];
        }

        let finalString = final.replaceAll(' and '+this.LTVScoreString,'');


        this.FinalExp = finalString;


      console.log('let',final);
      this.customerData(finalString)
      val.isChecked=false;
      val.Status = "Include"
      if(event.checked){
        val.isChecked=true;
        val.Status = "Include";
        //this.BrandName.push(val);
      }

      this.LTVSBoolean = !this.LTVSBoolean;
      console.log('disable',this.LTVSBoolean);
    }
  }

  //SalesCheck
  getSaleCheck(event,val){

    this.api.getRetainData().subscribe(res=>{
      console.log('getScore',res);
      if(res != undefined){
      this.scoreFrom = res.scoreFrom;

      if(res.salesValueFrom  != undefined)
      this.salesFrom = res.salesValueFrom;
  if(res.salesValueTo != undefined)
  this.salesTo = res.salesValueTo;

  if(res.serviceValueFrom != undefined)
  this.servicesFrom = res.serviceValueFrom;
  if(res.ServiceValueTo != undefined)
  this.servicesTo = res.ServiceValueTo;

  if(res.salesScoreFrom != undefined)
  this.salesScoreFrom = res.salesScoreFrom;
  if(res.salesScoreTo != undefined)
    this.salesScoreTo = res.salesScoreTo;
 if(res.serviceScoreFrom != undefined)
    this.serviceScoreFrom = res.serviceScoreFrom;
   if(res.serviceScoreTo != undefined)
     this.serviceScoreTo = res.serviceScoreTo;

      }


    })

    this.api.getStoreData().subscribe(res =>{
      console.log(res);
      this.newStoreArray = res.data;
      })

      this.api.getBrandList().subscribe(res=>{
      console.log('brandVal',res);
      this.newbrandList = res

      })

    let final = this.FinalExp;


      if(event.target.checked == true){


      final = final+(' and '+this.SalesValueString);

        console.log('get',final);
        this.FinalExp = final;

        this.customerData(final)
        val.isChecked=true;
        val.Status = "Exclude"
        if(event.checked){
          val.isChecked=false;
          val.Status = "Exclude"
         // this.BrandName.push(val);
        }

        this.SalesValueString ='';

        this.SalesBoolean=!this.SalesBoolean;
        console.log('disable',this.SalesBoolean)
      }
      else{


      this.SalesValueString ='';
      let final1 = final.split( ' and ');

      for(var i=0;i<final1.length; i++)
      {
         if(final1[i].includes("CVP_TotalPrice"))
           if(this.SalesValueString == '')
            this.SalesValueString = this.SalesValueString+final1[i];
           else
           this.SalesValueString = this.SalesValueString+' and '+final1[i];
      }

      let finalString = final.replaceAll(' and '+this.SalesValueString,'');
     // let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))
      this.FinalExp = finalString;

        console.log('let',final);
        this.customerData(finalString)
        val.isChecked=false;
        val.Status = "Include"
        if(event.checked){
          val.isChecked=true;
          val.Status = "Include"
          //this.BrandName.push(val);
        }
        this.SalesBoolean=!this.SalesBoolean;
        console.log('disable',this.SalesBoolean)
      }
    }

//ServiceCheck
getServiceCheck(event,val){

  this.api.getRetainData().subscribe(res=>{
   // console.log('getScore',res);
    if(res != undefined){
    this.scoreFrom = res.scoreFrom;

    if(res.salesValueFrom  != undefined)
    this.salesFrom = res.salesValueFrom;
if(res.salesValueTo != undefined)
this.salesTo = res.salesValueTo;

if(res.serviceValueFrom != undefined)
this.servicesFrom = res.serviceValueFrom;
if(res.ServiceValueTo != undefined)
this.servicesTo = res.ServiceValueTo;

if(res.salesScoreFrom != undefined)
  this.salesScoreFrom = res.salesScoreFrom;
  if(res.salesScoreTo != undefined)
    this.salesScoreTo = res.salesScoreTo;
 if(res.serviceScoreFrom != undefined)
    this.serviceScoreFrom = res.serviceScoreFrom;
   if(res.serviceScoreTo != undefined)
     this.serviceScoreTo = res.serviceScoreTo;

    }


  })

  this.api.getStoreData().subscribe(res =>{
   // console.log(res);
    this.newStoreArray = res.data;
    })

    this.api.getBrandList().subscribe(res=>{
   // console.log('brandVal',res);
    this.newbrandList = res

    })

  let final = this.FinalExp;



    if(event.target.checked == true){



      final = final+(' and '+this.ServiceValueString);


      console.log('get',final);
      this.FinalExp = final;
      this.customerData(final)
      val.isChecked=true;
      val.Status = "Exclude"
      if(event.checked){
        val.isChecked=false;
        val.Status = "Exclude"
        //this.BrandName.push(val);
      }
      this.ServiceValueString ='';

      this.ServiceBoolean = !this.ServiceBoolean;
      console.log('disable',this.ServiceBoolean)
    }
    else{



      this.ServiceValueString ='';
      let final1 = final.split( ' and ');

      for(var i=0;i<final1.length; i++)
      {
         if(final1[i].includes("CVP_RosRevenue"))
           if(this.ServiceValueString == '')
            this.ServiceValueString = this.ServiceValueString+final1[i];
           else
           this.ServiceValueString = this.ServiceValueString+' and '+final1[i];
      }

      let finalString = final.replaceAll(' and '+this.ServiceValueString,'');
     // let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))
      this.FinalExp = finalString;


     // console.log('let',final);

      this.customerData(finalString)
      val.isChecked=false;
      val.Status = "Include"
      if(event.checked){
        val.isChecked=true;
        val.Status = "Include"
        this.BrandName.push(val);
      }

      this.ServiceBoolean = !this.ServiceBoolean;
      //console.log('disable',this.ServiceBoolean)
    }
  }

  // Service Sore check
  getServiceScoreCheck(event,val){

    this.api.getRetainData().subscribe(res=>{
     // console.log('getScore',res);
      if(res != undefined){
      this.scoreFrom = res.scoreFrom;

      if(res.salesValueFrom  != undefined)
      this.salesFrom = res.salesValueFrom;
  if(res.salesValueTo != undefined)
  this.salesTo = res.salesValueTo;

  if(res.serviceValueFrom != undefined)
  this.servicesFrom = res.serviceValueFrom;
  if(res.ServiceValueTo != undefined)
  this.servicesTo = res.ServiceValueTo;

  if(res.salesScoreFrom != undefined)
    this.salesScoreFrom = res.salesScoreFrom;
    if(res.salesScoreTo != undefined)
      this.salesScoreTo = res.salesScoreTo;
   if(res.serviceScoreFrom != undefined)
      this.serviceScoreFrom = res.serviceScoreFrom;
     if(res.serviceScoreTo != undefined)
       this.serviceScoreTo = res.serviceScoreTo;

      }


    })

    this.api.getStoreData().subscribe(res =>{
     // console.log(res);
      this.newStoreArray = res.data;
      })

      this.api.getBrandList().subscribe(res=>{
     // console.log('brandVal',res);
      this.newbrandList = res

      })

    let final = this.FinalExp;



      if(event.target.checked == true){



          final = final+(' and '+ this.ServiceScoreString);


        console.log('get',final);
        this.FinalExp = final;

        this.customerData(final)
        val.isChecked=true;
        val.Status = "Exclude"
        if(event.checked){
          val.isChecked=false;
          val.Status = "Exclude"
          //this.BrandName.push(val);
        }

        this.ServiceScoreString ='';

        this.ServiceScoreBoolean = !this.ServiceScoreBoolean;
        console.log('disable',this.ServiceBoolean)
      }
      else{


       this.ServiceScoreString ='';
      let final1 = final.split( ' and ');

      for(var i=0;i<final1.length; i++)
      {
         if(final1[i].includes("UCSD_SERVICE"))
           if(this.ServiceScoreString == '')
            this.ServiceScoreString = this.ServiceScoreString+final1[i];
           else
           this.ServiceScoreString = this.ServiceScoreString+' and '+final1[i];
      }

      let finalString = final.replaceAll(' and '+this.ServiceScoreString,'');
     // let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))
      this.FinalExp = finalString;



        this.customerData(finalString);
        val.isChecked=false;
        val.Status = "Include"
        if(event.checked){
          val.isChecked=true;
          val.Status = "Include"
          this.BrandName.push(val);
        }

        this.ServiceScoreBoolean = !this.ServiceScoreBoolean;
        //console.log('disable',this.ServiceBoolean)
      }
    }

    // Sales Score Check
    getSaleScoreCheck(event,val){

      this.api.getRetainData().subscribe(res=>{
        console.log('getScore',res);
        if(res != undefined){
        this.scoreFrom = res.scoreFrom;

        if(res.salesValueFrom  != undefined)
        this.salesFrom = res.salesValueFrom;
    if(res.salesValueTo != undefined)
    this.salesTo = res.salesValueTo;

    if(res.serviceValueFrom != undefined)
    this.servicesFrom = res.serviceValueFrom;
    if(res.ServiceValueTo != undefined)
    this.servicesTo = res.ServiceValueTo;

    if(res.salesScoreFrom != undefined)
    this.salesScoreFrom = res.salesScoreFrom;
    if(res.salesScoreTo != undefined)
      this.salesScoreTo = res.salesScoreTo;
   if(res.serviceScoreFrom != undefined)
      this.serviceScoreFrom = res.serviceScoreFrom;
     if(res.serviceScoreTo != undefined)
       this.serviceScoreTo = res.serviceScoreTo;

        }


      })

      this.api.getStoreData().subscribe(res =>{
        console.log(res);
        this.newStoreArray = res.data;
        })

        this.api.getBrandList().subscribe(res=>{
        console.log('brandVal',res);
        this.newbrandList = res

        })

      let final = this.FinalExp;


        if(event.target.checked == true){




        final = final+(' and '+this.SalesScoreString);


          console.log('get',final);
          this.FinalExp = final;

          this.customerData(final)
          val.isChecked=true;
          val.Status = "Exclude"
          if(event.checked){
            val.isChecked=false;
            val.Status = "Exclude"
           // this.BrandName.push(val);
          }
          this.SalesScoreString ='';

          this.SaleScoreBoolean=!this.SaleScoreBoolean;
          console.log('disable',this.SalesBoolean)
        }
        else{



        this.SalesScoreString ='';
        let final1 = final.split( ' and ');

        for(var i=0;i<final1.length; i++)
        {
           if(final1[i].includes("UCSD_SALES"))
             if(this.SalesScoreString == ''){
               this.SalesScoreString = this.SalesScoreString+final1[i];
               if(this.SalesScoreString == "UCSD_SALES > 0")
               this.SalesScoreString ='';
             }
             else
             this.SalesScoreString = this.SalesScoreString+' and '+final1[i];
        }

        let finalString = final.replaceAll(' and '+this.SalesScoreString,'');
       // let finalString = stringwithoutStore.substring(0,stringwithoutStore.lastIndexOf(' and '))
        this.FinalExp = finalString;



          console.log('let',final);
          this.customerData(finalString)
          val.isChecked=false;
          val.Status = "Include"
          if(event.checked){
            val.isChecked=true;
            val.Status = "Include"
            //this.BrandName.push(val);
          }
          this.SaleScoreBoolean=!this.SaleScoreBoolean;
          console.log('disable',this.SalesBoolean)
        }
      }





  StoreData(val) {
    //console.log("data" + val);
    this.stores.push(val);

  }

  DataonChange(){

    if(this.searchForm.value.searchText !=''){



    let srchTxt = this.searchForm.value.searchText.replace("(","").replace(")","").replaceAll("-","").replaceAll(".","").trim();

    if(this.AllowOnlyNumbers(srchTxt) == true)
    this.FinalExp = "((UC_Phone1 like '%"+srchTxt+"%') or (UC_Phone2 like '%"+srchTxt+"%') or (UC_Email like '%"+srchTxt+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+srchTxt+"%'))"
    else

    this.FinalExp = "((UC_Phone1 like '%"+this.searchForm.value.searchText+"%') or (UC_Phone2 like '%"+srchTxt+"%') or (UC_Email like '%"+this.searchForm.value.searchText+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchForm.value.searchText+"%'))";
    this.PageCount = 0;
    this.customersList=[];



    this.customerData(this.FinalExp)
    }
    else{
      this.getCustomersInitialData();
    }
   

// const obj = {
//   "Expression": this.FinalExp
// }
// // //console.log(obj)
// this.api.postmethod('customersdata/get', obj).subscribe(res => {
//   if (res.status == 200) {


//     this.customersList = this.newCustomer
//     if(this.customersList.length>0){
//       this.isNoRec=true
//     }
//     // //console.log(this.customersList)
//     setTimeout(() => {
//       this.spinner.hide()
//     }, 1000);
//   }
// },
//   (error) => {
//     //console.log(error);
//   }
// )

}


// getFilterData(Exp){

//   const obj = {
//     "Expression":Exp
//   }
//   this.api.postmethod('customersdata/countoffilters',obj).subscribe(res =>{
//     console.log('ress',res);

//   })
// }

  customerData(Exp) {
    //console.log("success "+Exp);
    this.isNoRec = false;

    this.spinner.show()
    const obj = {
      "Expression": Exp,
      "Count" : this.PageCount,
      "totalCount" : 0,
      "topCount" : this.RowCount
    }
    //console.log(obj)
    this.api.postmethod('customersdata/GetCustomersDataDev2', obj).subscribe(res => {
      if (res.status == 200) {

        this.initalVal = 'N';
        localStorage.setItem("Fromview",'N');
        //this.customersList =[];
        let clist=[];
        if(res.response != null){
        clist = res.response.recordset;
        if(clist == undefined || clist.length == 0 ){
          if(this.customersList.length == 0){
          this.isNoRec = false;
          this.totalRecordsCount = res.response.output;
          this.customersList= []
          }
        }
        else{
          this.isNoRec = true;
          if(this.PageCount == 0)
          {
            this.customersList =[];
           this.customersList =clist;
          }
          else
            this.customersList= [ ...this.customersList, ...clist];
         //this.customersList= clist;
         this.totalRecordsCount = res.response.output.totalCount;

        }
      }
      // if(res.response.Details.CustomerDetails!= undefined){
      //   this.custScoreCount=res.response.Details.CustomerDetails;
      //   this.currentRate=this.custScoreCount[0].LTVScore
      //  }
      else{
        this.spinner.hide();
      }

       this.api.getFilterList().subscribe((res:any)=>{
      console.log('storeList',res);
      if(res.length != 0)
      {
       // if(this.StoreName.length ==0){
        this.StoreName =[];
        this.BrandName =[];
        this.SaleCount = [];
        this.ServiceCount = [];
        this.LTVCount = [];
        this.SalesScoreCount =[];
        this.ServiceScoreCount = [];
        if(res.Result){
          if(res.Result.StoreList != undefined){
            this.StoreName=res.Result.StoreList[0].Store;

          this.StoreName.map((ele) => {
            if(ele.Status ==undefined)
              ele.Status = "Exclude"
          });
       }
      // if(res.Result)
      if(res.Result.BrandList != undefined){
        this.BrandName=res.Result.BrandList[0].Brand;

          this.BrandName.map((ele) => {
            if(ele.Status ==undefined)
              ele.Status = "Exclude"

        });
      }

        this.SaleCount=res.Result.SalesCount;
        if(this.SaleCount != undefined)
        this.SaleCount.map((s)=>{
          if(s.Status ==undefined)
            s.Status = 'Exclude'
        })


        this.ServiceCount=res.Result.ServiceCount;
        if(this.ServiceCount != undefined)
        this.ServiceCount.map((x)=>{
          if(x.Status ==undefined)
            x.Status = 'Exclude'
        })


        this.LTVCount=res.Result.ScoreCount;
        if(this.LTVCount != undefined)
        this.LTVCount.map((l)=>{
          if(l.Status ==undefined)
            l.Status = 'Exclude'
        })

        this.SalesScoreCount = res.Result.SalesScoreCount;
        if(this.SalesScoreCount != undefined)
        this.SalesScoreCount.map((sa)=>{
          if(sa.Status ==undefined)
            sa.Status = 'Exclude'
        })

        this.ServiceScoreCount = res.Result.ServiceScoreCount;
        if(this.ServiceScoreCount != undefined)
        this.ServiceScoreCount.map((ss)=>{
          if(ss.Status ==undefined)
            ss.Status = 'Exclude'
        })

      }
    }

    })




        if(this.customersList.length>0){
          this.isNoRec=false;
        }
        else{
          this.isNoRec=true;
        }
        //console.log(this.customersList)
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);
      }
    },
      (error) => {
        //console.log(error);
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
        //console.log(error);
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
    // //console.log(this.dealerExp)
    // //console.log(this.storesList)
  }

  toggleblockandgrid(e){

    this.spinner.show()
    e == 'block' ? this.block=true: this.block=false;
    e =='grid' ? this.grid=true:this.grid=false;
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    //console.log('block',e);
    //console.log(this.block);


  }
  closeResult:any;
  modalOptions: NgbModalOptions;
  fullHistory(customerdetails:any,content:any) {
    // let custDetails=customerdetails.UC_ID
    localStorage.setItem('customerID', customerdetails.UC_ID)
    this.customerDetails();

    // this.Router.navigate(['/customerdata'])
    // this.isFirstPopupOpen = !this.isFirstPopupOpen;

    this.ngbModal.open(content, this.modalOptions).result.then(()=>{


    })
  }


  // GetvehicleInfo(){
  //   this.spinner.show();
  //   const Obj={
  //     "CustId": this.custDetails.UC_ID,

  //     "dealNumber": this.dealNumber
  //   }
  //   console.log('obj',Obj);

  //   this.api.postmethod('customersdata/GetVehicleinfoView',Obj).subscribe((res:any)=>{
  //     console.log(res);
  //     if(res.status==200){
  //       this.spinner.hide();
  //       this.VehicleInfo=res.response;

  //       console.log('VehicleInfor',this.VehicleInfo);
  //       this.VehicleName=this.VehicleInfo.BuyerDetails.PurchaseDetails[0].Vehicle[0].split(' ')
  //       console.log('vehiclename',this.VehicleName);
  //       this.Address=this.VehicleInfo.BuyerDetails.BuyerInfo[0].UserAddress[0].split(',')
  //       console.log('address',this.Address);

  //     }


  //   })

  // }

  viewAccelfi(customerdetails:any,contentdata:any){


    this.dealNumber=customerdetails.dealno;
    console.log('custmdetails',this.dealNumber);
    // this.GetvehicleInfo();
    this.spinner.show();
    const Obj={
      "CustId": this.custDetails.UC_ID,

      "dealNumber": this.dealNumber
    }
    console.log('obj',Obj);

    this.api.postmethod('customersdata/GetVehicleinfoView',Obj).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        this.spinner.hide();
        this.VehicleInfo=res.response;
        this.VehicleName=this.VehicleInfo.BuyerDetails.PurchaseDetails[0].Vehicle[0].split(' ')
        this.Address=this.VehicleInfo.BuyerDetails.BuyerInfo[0].UserAddress[0].split('_')
        this.CityZip=this.Address[1].split(',');
        this.CityState=this.CityZip[1].split(' ');
        this.Opacity='Y';

        this.ngbModal.open(contentdata, this.modalOptions).result.then(()=>{

        })

      }



    })


  }


  // ServiceInfo

  ViewSerivice(ServiceDetails:any,contentdata:any){

    console.log('servicedetails',ServiceDetails);
    this.spinner.show();
    const Obj={
      "CustId": this.custDetails.UC_ID,

      "ronumber": ServiceDetails.ronumber[0]
    }
    console.log('Serviceobj',Obj);

    this.api.postmethod('customersdata/GetServiceDetailsByRO',Obj).subscribe((res:any)=>{
      if(res.status==200){
        this.spinner.hide();
        this.ServInfo=res.response.ServiceInfo.ServiceHistory[0].ServiceDetails[0];

        console.log('Serviceinfo',this.ServInfo);
        if(res.response.ServiceInfo.RoInfo[0].RoDetails!=undefined){
           this.RoDetails= res.response.ServiceInfo.RoInfo[0].RoDetails;
           this.RoDetails.splice(ServiceDetails,1)
          // this.hide=false;
        console.log('RODetailss',this.RoDetails);
        }



        this.hide=true;
        this.Opacity='Y';

        this.ngbModal.open(contentdata, this.modalOptions).result.then(()=>{

        })
      }

    })



  }

  // ViewSeriviceClick(data:any){

  //   this.RoDetails=data.ServiceInfo.RoInfo[0].RoDetails
  //   this.ViewServinfo=true;
  //   // this.Request.push(this.ServiceRequest)
  //   console.log('serviceRequest',this.RoDetails);
  // }
  closePopup(){
  this.Opacity='N';

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

    // this.apply(el);
  }

  closeFilter(){
  //  this.filterblock=false
  }
  filterToggle($event){
    if(window.screen.width<1366){
      this.clicked=true
    }
  }

  //customerlist
  toggleStatus() {
    this.isShow = !this.isShow;
  }
  backtolist(){
    this.Router.navigate(['/customerslist'])
  }
  TotalSalesPrice :number=0;
  TotalServicePrice : number=0;
  custEmail='';
  showServiceHistory:boolean=false;
  customerDetails(){
    this.spinner.show()
    const obj={
       "cusId": localStorage.getItem('customerID')
      //"cusId": '4083'

  }
  this.custEmail ='';
  this.TotalSalesPrice=0;
    this.TotalServicePrice =0;
    this.custPurchaseHistory=[];
    this.custServiceHistory =[];
    this.custDetails =[];
    this.custScoreCount =[];
    this.custOfferHistory=[];
  this.api.postmethod('customersdata/customerfulldata',obj).subscribe((res:any)=>{
    if(res.status==200){
      //console.log(res)
     this.spinner.hide();
     this.custDetails =[];
     this.TotalSalesPrice=0;
     this.TotalServicePrice =0;
     this.custPurchaseHistory=[];
     this.custServiceHistory =[];
     //this.custOfferHistory=[];
     this.custDetails=res.response.CustomerDetails.Details[0];
     this.custEmail = this.custDetails.Email[0];
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
      if(this.custPurchaseHistory.length > 1){
        for(var i=0;i< this.custPurchaseHistory.length;i++){
           this.TotalSalesPrice += parseInt(this.custPurchaseHistory[i].Costprice);
        }
      }
      else{
        this.TotalSalesPrice = this.custPurchaseHistory[0].Costprice;
      }
     }
     if(res.response.CustomerDetails.ServiceHistory != undefined){
      this.custServiceHistory=res.response.CustomerDetails.ServiceHistory[0].ServiceDetails;
      if(this.custServiceHistory.length > 1){
        for(var j=0;j< this.custServiceHistory.length;j++){
           this.TotalServicePrice += parseInt(this.custServiceHistory[j].Cost);
        }
      }
      else{
        this.TotalServicePrice = this.custServiceHistory[0].Cost;
      }
     }
     else{
      this.showServiceHistory = true;
     }

     }
   },
   (error) => {
    //console.log(error);
   }
   )


  }

  close() {
    this.ngbModal.dismissAll();
    this.showServiceHistory = false;
    this.purchaseButton=false;
    this.custHistButton = false;
    // this.TotalSalesPrice=0;
    // this.TotalServicePrice =0;
    // this.custPurchaseHistory=[];
    // this.custServiceHistory =[];
    // this.custDetails =[];
  }




  loadMoreCustomers(e){
    if(this.initalVal == 'N'){
    if (

      e.target.scrollTop + e.target.clientHeight >=

      e.target.scrollHeight

    ) {
        this.PageCount+=100;
        this.customerData(this.FinalExp)

      }
    }
  }

  AllowOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  getValue(e, phno){
    let smsVal='';
    if(e.target.checked)
      smsVal = 'Y'
    else
      smsVal = 'N'

   const obj={ "expression": phno,
   "status": smsVal }   ;

     console.log(obj);


   this.api.putmethod('customersdata/UpdateOptOut', obj).subscribe((response)=>{
       if(response.status == 200){
           console.log('status update');

       }
   })

  }

  vehicleArray :any=[];
  parseJsonToArray(obj){

   return(JSON.parse(obj));

  }

  initalVal :any='Y';
  getCustomersInitialData(){

    this.initalVal = 'Y';

    const obj={
      'Expression' : ''
    }
    this.spinner.show();
    this.api.postmethod('customersdata/GetCustomersInitialData',obj).subscribe((response:any)=>{
        if(response.status == 200){
          this.spinner.hide();
          let clist=[];
          this.isNoRec = false;
          clist = response.response;
          //this.customersList= [ ...this.customersList, ...clist];
          this.customersList= clist;
          this.totalRecordsCount = 50;

        }
    })
  }
  highIcon(){
    this.upIcon=false;
    this.downIcon=true;
  }
  lowIcon(){
    this.upIcon=true;
    this.downIcon=false;
  }

   // download excel sheet
  ExportToExcel(){
    let element = document.getElementById('excel-data')
    var wscols = [{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},
                  {wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},{wch:20},];
    var wsrows = [{hpt:30},{hpt:30},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:30},{hpt:30},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:30},{hpt:30},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:30},{hpt:30},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:30},{hpt:30},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},
                  {hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},{hpt:20},];
    this.excelSrv.CustomerReportsXLSX(element,'customer_data',wscols,wsrows);

  }

  customerautofill() {
    console.log("success ");

    const obj = {
      "Expression":""
    }
    console.log(obj)
    this.api.postmethod('customersdata/GetCustomerNamesForAutofill', obj).subscribe((res: any) => {
      console.log('ra', res);
      this.customernamelist = res.response

    })
    // this.customerData(this.FinalExp)
  }

  DataTofilter(val: any) {
    // this.customernamelist=[]
    this.customerautofill()
    return this.customernamelist.filter(

      (option: { Name: any }) =>

        option.Name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) === 0
    );

  }

  OnChange(e: any) {
    console.log(e.target.value);
    if(e.target.value == '') {
      this.closelist = false;
    }
    else {
    this.filterlist = this.DataTofilter(e.target.value.toLocaleLowerCase());
    this.closelist = true;
    console.log(this.filterlist);
    }
  }

  search(val: any) {
    if(val == ''){
      this.closelist = true
    }
    else{
    this.searchText = val;
    this.FinalExp = "( ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchText+"%'))";
    this.customerData(this.FinalExp)
    this.closelist = false;
    this.customersList=[]
    }
  }


}

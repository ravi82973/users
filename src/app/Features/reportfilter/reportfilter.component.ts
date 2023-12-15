import { Component, OnInit,Input, Renderer2, ViewChild,Output,EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import * as CONST from "./constants";
import {Router} from '@angular/router';
import { LabelType, Options } from  '@angular-slider/ngx-slider'



@Component({
  selector: 'app-reportfilter',
  templateUrl: './reportfilter.component.html',
  styleUrls: ['./reportfilter.component.scss']
})
export class ReportfilterComponent implements OnInit {

  public selectedItems = [];
  StoresIds: any = []

  // @Input() Parentcomponent: any;
  @Output() store = new EventEmitter<string>();

  currentItem = 'Data';

  FromDate: any;
  ToDate: any;
  TotalReport: any = 'T';

  // hoveredDate: NgbDate | null = null;
  // fromDate: NgbDate | null;
  // toDate: NgbDate | null;

  stores: any = [];
  salesPersons: any = [];
  salesManagers: any = [];
  financeManager: any = [];
  selectedStores: any = [];
  selectedAttributes:any = [];
  searchButtonGroupAttributes: any;
  public formatOptions = {
    month: 'long'
  };

  Regions:any=[]
  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';

  maxDate: any;
  // @ViewChild('warningbtn') warningbtn: ElementRef;
  alertmessage: string;

  FinalExp: any;
  searchText:any='';
  customersList: any = [];
  //Dealership
  storesList:any=[];
  dealerExp:any=[];

  //Score
  scoreFrom:any=[];
  scoreTo:any='';

  //Sales
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
  block: boolean;
  grid: boolean;
  isScore:boolean;
  isSale:boolean;
  isService:boolean;
  isStore:boolean;
  isBrand:boolean;
  selectedBrands:any=[];
  selectedBrandsNames: any=[];
  isLoading:boolean=false;
  userDetails: any=[];
  selectedDealerIds: any;
  selectedDealerNames: any;
  submitted= false;

  SelectedList:any=[];
  BrandNameList:any=[];
  countTask = 0;
  FilteredData:any=[];
  isProximity :boolean=false;
  isVehicleEquity:boolean=false;
  proXvalue: number=15;
  LoanXvalue1: number=3000;
  LoanXvalue2: number=3;

  saleValue: number = 0;
  SalehighValue: number = 0;
  serviceValue: number = 0;
  servicehighValue: number = 0;

  salesScoreValue: number = 0;
  salesScorehighValue: number = 0;
  serviceScoreValue: number = 0;
  serviceScorehighValue: number = 0;

  salesScoreFrom : number= 0;
  salesScoreTo : number = 0;
  serviceScoreFrom : number = 0;
  serviceScoreTo : number = 0;

  vipcls : boolean=true;
  platcls:  boolean=true;
  emecls: boolean=true;
  goldcls: boolean=true;
  newcls: boolean=true;



optionsscore: Options = {
    floor: 0,
    ceil: 100,
    hideLimitLabels: true,
    step: 10,
    // translate: (value: number, label: LabelType): string => {

    //        return "$" + value.toLocaleString('en');}

  };

  veh_class: any;


  options: Options = {
    floor: 0,
    ceil: 100000,
    hideLimitLabels: true,
    step: 5000,translate: (value: number, label: LabelType): string => { 
    //  switch (label) {
    //   case LabelType.Low: return " $" + value;
    //   case LabelType.High:
    //      return " $" + value;
    //      default:
           return "$" + value.toLocaleString('en');}
          //}
  };
  options1: Options = {
    floor: 0,
    ceil: 10000,
    hideLimitLabels: true,
    step: 1000,translate: (value: number, label: LabelType): string => { 
      // switch (label) {
      //  case LabelType.Low: return " $" + value;
      //  case LabelType.High:
      //     return " $" + value;
      //     default:
          return "$" + value.toLocaleString('en');}
       // }
  };
  optionProx: Options = {floor: 0,ceil: 100,
    showSelectionBarFromValue: 0,
    hideLimitLabels: true,
    translate: (value: number, label: LabelType): string => { 
      switch (label) {
       case LabelType.Low: return " < <a>" + value+" miles</a>";
       case LabelType.High:
          return " " + value+" miles";
          default:
          return "" + value+" miles";}
      }
    };

  optionVehicle1: Options = {floor: 0,ceil: 10000,
    step:50,
    showSelectionBarFromValue: 0,
    hideLimitLabels: true,
    translate: (value: number, label: LabelType): string => { 
      switch (label) {
       case LabelType.Low: return " $" + value.toLocaleString('en')+"<b> + </b>";
       case LabelType.High:
          return " $" + value.toLocaleString('en');
          default:
          return "$" + value.toLocaleString('en');}
      }
  };

  optionVehicle2: Options = {floor: 0,ceil: 12,
    showSelectionBarFromValue: 0,
    hideLimitLabels: true,
    translate: (value: number, label: LabelType): string => { 
      switch (label) {
       case LabelType.Low: return value + "<a> Months </a> ";

          default:
          return "" + value;}
      }
    };
  userid: any='';
  countForm: FormGroup;

  constructor(private ngbmodal: NgbModal, private service: ApiServiceService,private fB: FormBuilder,) {

    //this.userDetails =(JSON.parse( localStorage.getItem('userdetails')));
    this.selectedAttributes=[];
    this.dealerExp = [];
    this.scoreFrom=[];
    this.scoreTo='';
    this.salesFrom='';
    this.salesTo='';
    this.servicesFrom='';
    this.servicesTo='';
    this.selectedBrandsNames=[];
    this.selectedBrands=[];

    this.countForm = this.fB.group({
      rowCount: ['100'],

    });

   }


  ngOnInit(): void {



    // this.FinalExp = "((UC_Phone1 like '%"+this.searchText+"%') or (UC_Email like '%"+this.searchText+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchText+"%'))"
    // this.customerData(this.FinalExp);
    this.countForm = this.fB.group({
      rowCount: ['100'],

    });

    let userDetails = localStorage.getItem("userdetails");
    this.userid = JSON.parse(userDetails).ADuserid;
    this.bindDealersList();
    this.service.setFilterList(this.FilteredData)
  //this.getStoreRegions();


    // this.Regions=[
    //   {"RG_Name":"Eastern"},
    //   {"RG_Name":"Western "},
    //   {"RG_Name":"Northern "},
    //   {"RG_Name":"Southern "},

    // ]

    // this.stores=[
    //   {"ST_Name":"Acura"},
    //   {"ST_Name":"Audi"},
    //   {"ST_Name":"BMW"},
    //   {"ST_Name":"Cadillac"},
    //   {"ST_Name":"Chevrolet"},
    //   {"ST_Name":"GMC"},
    //   {"ST_Name":"Honda"},
    //   {"ST_Name":"Hyundai"},
    //   {"ST_Name":"Kia"},
    //   {"ST_Name":"Lexus"},
    //   {"ST_Name":"Subharu"},
    //   {"ST_Name":"Toyota"},
    //   {"ST_Name":"Suzuki"},


    // ]





  }

  // addNewItem(value) {
  //   this.newItemAdded.emit(value);
  // }

  ngAfterViewInit(){

    this.service.getRetainData().subscribe(res =>{
      console.log('ress',res);
      // this.submitted= true;
     if(res != undefined){
      if(res.selectedAttributes?.length >0 && res.selectedAttributes.length != undefined){
        this.selectedAttributes=[];
        if(this.selectedAttributes.length === res.selectedAttributes.length){
          this.selectedAttributes=[];
         this.dealerExp=[];
        }
        else{
          this.selectedAttributes=[];
          this.dealerExp=[];
      for(let i=0; i<res.selectedAttributes.length; i++)
      {
        this.selectedAttributes.push(res.selectedAttributes[i])
        this.dealerExp.push(res.selectedAttributes[i]);

      }
    }
    }

    //  this.scoreClicked =[];
    //  this.scoreFrom =[];
      if(res.scoreFrom ?.length != undefined){
          this.scoreFrom  = res.scoreFrom;
          for(var i=0;i<this.scoreFrom.length;i++)
         // this.scoreFrom.forEach(element => {
            this.scoreClicked.push(this.scoreFrom[i]);
         // });
      }
      // if(res.scoreFrom ?.length != undefined)
      //     this.scoreTo =res.scoreTo;
      if(res.salesValueFrom  != undefined){

         if(res.salesValueFrom == ""){
            this.salesFrom = 0;
            this.saleValue = this.salesFrom
         }
         else{
          this.salesFrom = res.salesValueFrom;
          this.saleValue = this.salesFrom
         }
      }
      if(res.salesValueTo != undefined)
       {
          if(res.salesValueTo == ''){
            this.salesTo = 0;
            this.SalehighValue = this.salesTo
          }
          else{
      this.salesTo = res.salesValueTo;
      this.SalehighValue = this.salesTo
          }
      }

      if(res.serviceValueFrom != undefined){

        if( res.serviceValueFrom ==""){
          this.servicesFrom = 0;
      this.serviceValue = this.servicesFrom;
        }
        else{
      this.servicesFrom = res.serviceValueFrom;
      this.serviceValue = this.servicesFrom;
        }
      }
      if(res.ServiceValueTo != undefined){
        if(res.ServiceValueTo == ""){
          this.servicesTo = 0;
          this.servicehighValue = this.servicesTo;
        }
        else{
          this.servicesTo = res.ServiceValueTo;
          this.servicehighValue = this.servicesTo;
        }

      }

      // sales score related
      if(res.salesScoreFrom != undefined){
          if(res.salesScoreFrom == ''){
              this.salesScoreFrom = 0;
              this.salesScoreValue =  this.salesScoreFrom ;
          }
          else{
            this.salesScoreFrom = res.salesScoreFrom;
            this.salesScoreValue = this.salesScoreFrom;
              }
      }

      if(res.salesScoreTo != undefined){
        if(res.salesScoreTo == ''){
            this.salesScoreTo = 0;
            this.salesScorehighValue =  this.salesScoreTo ;
        }
        else{
          this.salesScoreTo = res.salesScoreTo;
          this.salesScorehighValue = this.salesScoreTo;
            }
    }


  // service score related
    if(res.serviceScoreFrom != undefined){
      if(res.serviceScoreFrom == ''){
          this.serviceScoreFrom = 0;
          this.serviceScoreValue =  this.serviceScoreFrom ;
      }
      else{
        this.serviceScoreFrom = res.serviceScoreFrom;
        this.serviceScoreValue = this.serviceScoreFrom;
          }
  }

  if(res.serviceScoreTo != undefined){
    if(res.serviceScoreTo == ''){
        this.serviceScoreTo = 0;
        this.serviceScorehighValue =  this.serviceScoreTo ;
    }
    else{
      this.serviceScoreTo = res.serviceScoreTo;
      this.serviceScorehighValue = this.serviceScoreTo;
        }
}

      if(res.Selectedbrands?.length >0 && res.Selectedbrands.length != undefined){
        this.selectedBrandsNames=[];
        this.selectedBrands =[];
        this.BrandNameList =[];
      for(let i=0; i<res.Selectedbrands.length; i++)
      {
        this.selectedBrandsNames.push(res.Selectedbrands[i])
        this.selectedBrands.push(res.selectedBrandIds[i]);
        this.BrandNameList.push({'brand_chrome_id':res.selectedBrandIds[i],'brand_name': res.Selectedbrands[i]})

      }
    }
    if(res.rowCount != undefined)
     this.countForm.controls.rowCount.setValue(res.rowCount);
    // if(this.scoreFrom.length == 1)
    //    this.scoreClicked.push(this.scoreFrom)
    // else {
    //   this.scoreFrom.forEach(element => {
    //     this.scoreClicked.push(element)
    //   });
    // }
    // if(this.scoreFrom !='')
    // this.scoreClicked = this.scoreFrom.filter(
    //   (element, i) => i === this.scoreFrom.indexOf(element)
    //   );



    }
    })


  }

 ScoreVal(e){
  console.log('score value clicked');
  // e=='score' ? this.isScore=true:this.isSale=false
  // this.isScore=!this.isScore;
  if(e=='score'){
    this.isScore=true;
    this.isSale=false;
    this.isService=false;
    this.isStore=false;
    this.isBrand = false;
    this.isProximity = false;
    this.isVehicleEquity = false;
    this.veh_class = 'B';
    // if(this.scoreFrom.length == 1)
    //    this.scoreClicked.push(this.scoreFrom)
    // else {
    //   this.scoreFrom.forEach(element => {
    //     this.scoreClicked.push(element)
    //   });
    // }
    setTimeout(() => {
    //   if(this.scoreFrom.length == 0){
    //     this.isAllCust = true;

    //     var ID = document.getElementById("btnVipInc");
    //          ID.classList.add('vipcls');
    //     var ID1 = document.getElementById("btnVipExc")
    //         ID1.classList.remove('vipcls')

    //     var ID2 = document.getElementById("btnPlaInc");
    //          ID2.classList.add('platcls');
    //          var ID3 = document.getElementById("btnPlaExc")
    //          ID3.classList.remove('platcls')

    //     var ID4 = document.getElementById("btnEmeInc");
    //          ID4.classList.add('emecls');
    //          var ID5 = document.getElementById("btnEmeExc")
    //          ID5.classList.remove('emecls')

    //     var ID6 = document.getElementById("btnGoldInc");
    //          ID6.classList.add('goldcls');
    //          var ID7 = document.getElementById("btnGoldExc")
    //          ID7.classList.remove('goldcls')


    //     var ID8 = document.getElementById("btnNewInc");
    //          ID8.classList.add('newcls');
    //          var ID9 = document.getElementById("btnNewExc")
    //          ID9.classList.remove('newcls')

    // }
    if(this.scoreFrom.length != 5 && this.scoreFrom.length != 0){

      this.isAllCust = false;
      this.vipcls=false;
      this.platcls=false;
      this.emecls=false;
      this.goldcls=false;
      this.newcls=false;

  }


      if(this.scoreFrom.length == 1){
        // this.isAllCust = false;
        // if(this.scoreFrom[0] == 'V'){
        //   var ID = document.getElementById("btnVipInc");
        //       ID.classList.add('vipcls');
        //        var ID1 = document.getElementById("btnVipExc")
        //        ID1.classList.remove('vipcls')
        // }
        // if(this.scoreFrom[0] == 'P'){
        //   var ID = document.getElementById("btnPlaInc");
        //   ID.classList.add('platcls');
        //   var ID1 = document.getElementById("btnPlaExc")
        //   ID1.classList.remove('platcls')
        // }
        // if(this.scoreFrom[0] == 'E'){
        //   var ID = document.getElementById("btnEmeInc");
        //   ID.classList.add('emecls');
        //   var ID1 = document.getElementById("btnEmeExc")
        //     ID1.classList.remove('emecls')
        // }
        // if(this.scoreFrom[0] == 'G'){
        //   var ID = document.getElementById("btnGoldInc");
        //   ID.classList.add('goldcls');
        //   var ID1 = document.getElementById("btnGoldExc")
        //     ID1.classList.remove('goldcls')
        // }
        // if(this.scoreFrom[0] == 'N'){
        //   var ID = document.getElementById("btnNewInc");
        //   ID.classList.add('newcls');
        //   var ID1 = document.getElementById("btnNewExc")
        //   ID1.classList.remove('newcls')
        // }

        if(this.scoreFrom[0] == 'V'){
          this.vipcls=true;
        }
        if(this.scoreFrom[0] == 'P'){
          this.platcls=true
        }
        if(this.scoreFrom[0] == 'E'){
          this.emecls=true;
        }
        if(this.scoreFrom[0] == 'G'){
          this.goldcls=true;
        }
        if(this.scoreFrom[0] == 'N'){
          this.newcls=true;
        }

      }
      else
      if(this.scoreFrom.length > 1){

        for(var j=0;j< this.scoreFrom.length;j++){

          // var allId = document.getElementById("btnAllExc");
          // allId.classList.add('active');


          // if(this.scoreFrom[j] == 'V'){
          //   var ID = document.getElementById("btnVipInc");
          //   ID.classList.add('vipcls');
          //   var ID1 = document.getElementById("btnVipExc")
          //   ID1.classList.remove('vipcls')
          // }
          // if(this.scoreFrom[j] == 'P'){
          //   var ID = document.getElementById("btnPlaInc");
          //   ID.classList.add('platcls');
          //   var ID1 = document.getElementById("btnPlaExc")
          //   ID1.classList.remove('platcls')
          // }
          // if(this.scoreFrom[j] == 'E'){
          //   var ID = document.getElementById("btnEmeInc");
          //   ID.classList.add('emecls');
          //   var ID1 = document.getElementById("btnEmeExc")
          //     ID1.classList.remove('emecls')
          // }
          // if(this.scoreFrom[j] == 'G'){
          //   var ID = document.getElementById("btnGoldInc");
          //   ID.classList.add('goldcls');
          //   var ID1 = document.getElementById("btnGoldExc")
          //     ID1.classList.remove('goldcls')
          // }
          // if(this.scoreFrom[j] == 'N'){
          //   var ID = document.getElementById("btnNewInc");
          //   ID.classList.add('newcls');
          //   var ID1 = document.getElementById("btnNewExc")
          //   ID1.classList.remove('newcls')
          // }
          if(this.scoreFrom[j] == 'V'){
            this.vipcls=true;
          }
          if(this.scoreFrom[j] == 'P'){
            this.platcls=true;
          }
          if(this.scoreFrom[j] == 'E'){
            this.emecls=true;
          }
          if(this.scoreFrom[j] == 'G'){
            this.goldcls=true;
          }
          if(this.scoreFrom[j] == 'N'){
            this.newcls=true;
          }
        }



      }
      // this.scoreClicked = this.scoreFrom.filter((element, i) => i === this.scoreFrom.indexOf(element) );
    }, 2);

  }


 }

//  SalesVal(e){
//   console.log('sales value clicked');
//   // this.isSale=!this.isSale;
//   if(e=='sale'){
//     this.isSale=true;
//     this.isScore=false;
//     this.isService=false;
//     this.isStore=false;
//     this.isBrand = false;
//   }

//  }

SalesScore(e){
  this.isSale=false;
  this.isScore=false;
  this.isService=true;
  this.isStore=false;
  this.isBrand = false;
  this.isProximity = false;
  this.isVehicleEquity = false;
  this.veh_class = 'G';
}

 SalesVal(e){
  console.log('sales value clicked');
  // this.isSale=!this.isSale;
  if(e=='sale'){
    this.isSale=true;
    this.isScore=false;
    this.isService=false;
    this.isStore=false;
    this.isBrand = false;
    this.isProximity = false;
    this.isVehicleEquity = false;
    this.veh_class = 'C';
  }

 }
 ServiceVal(e){
  console.log('service value clicked');
  // this.isService=!this.isService;
  if(e=='service'){
    this.isService=true;
    this.isSale=false;
    this.isScore=false;
    this.isStore=false;
    this.isBrand = false;
    this.isProximity = false;
    this.isVehicleEquity = false;
  }

 }

 BrandVal(){
  console.log('brand value clicked');
  // this.isService=!this.isService;

    this.isBrand = true;
    this.isService=false;
    this.isSale=false;
    this.isScore=false;
    this.isStore=false;
    this.isProximity = false;
    this.isVehicleEquity = false;
    this.veh_class = 'E';

     this.isLoading =true;
    this.service.getBrandsData().subscribe((res:any) => {
      if (res.status == 200) {
        this.isLoading =false;
        this.brandsList = res.response;
        if(this.selectedBrandsNames.length == 0)
        this.selectedBrandsNames= this.brandsList.map(e=>{
          this.selectedBrands.push(e.brand_chrome_id)
          return e.brand_name;
        });


        console.log(this.brandsList);


      }
    },
      (error) => {
        console.log(error);
      }
    )


 }

 ProximityVal(e) {console.log('proximity value clicked');
 if (e == 'proximity') {
  this.isProximity = true;
  this.isSale = false;
  this.isScore = false;
  this.isService = false;
  this.isStore = false;
   this.isBrand = false;
   this.isVehicleEquity = false;
   this.veh_class = 'D';
  } 
} 
VehicleEquityVal(e) {
  if (e == 'equity') {
    this.isVehicleEquity = true;
    this.isProximity = false;
    this.isSale = false;
    this.isScore = false;
    this.isService = false;
    this.isStore = false;
    this.isBrand = false;
    this.isProximity = false;
    this.veh_class = 'F';
  }
}


 selectBrand(e){

  this.BrandNameList.push(e)
  console.log('selectedBrand', this.BrandNameList);
  this.service.setBrandList(this.BrandNameList);

  const index = this.selectedBrands.findIndex(i => i == e.brand_chrome_id)

       if (index >= 0) {

         this.selectedBrands.splice(index, 1);
         this.selectedBrandsNames.splice(index,1);

       }

       else {

         this.selectedBrands.push(""+e.brand_chrome_id+"");
         this.selectedBrandsNames.push(e.brand_name);

       }
       console.log(this.selectedBrands);
       console.log(this.selectedBrandsNames);

       console.log('brannd',e);


 }

 bindDealersList(){
  this.isStore=true;
    this.isSale=false;
    this.isScore=false;
    this.isService=false;
    this.isBrand = false;
    this.isProximity = false;
    this.isVehicleEquity = false;
    this.veh_class = 'A';
  const obj = {

    AD_USERID: localStorage.getItem("AxelUserId"),

  };
  let dealerStores =[];
  this.isLoading =true;
  this.service.postmethodOne('axelone/GetStoresByUserid',obj).subscribe((res :any)=> {
    if (res.status == 200) {
      this.isLoading =false;
      const obj = {
        userid: res.response[0].storeids
      }

      this.service.postmethodOne('axelone/GetStoreDetailsbyuserid',obj).subscribe((strresponse:any)=>{
        console.log(strresponse.response);
        if(strresponse.status == 200){

        //dealerStores = JSON.stringify(response.response);

        dealerStores = strresponse.response;

      this.storesList = dealerStores.sort((a,b) => (a.DEALER_NAME < b.DEALER_NAME) ? -1 : 1);
      console.log(this.storesList);
        }
    })
      // if(this.selectedAttributes.length == 0)
      // this.selectedAttributes= this.storesList.map(e=>{
      //   this.dealerExp.push(e.AS_ID);
      //   return e.AS_ID;
      // });


      // const obj = {
      //   "cora_acct_id": 0,
      //   "AS_ID": "0",
      //   "AS_Dealername": "All",
      //   "Status": "true"
      // }
      // this.storesList.unshift(obj);
    }
  },
    (error) => {
      console.log(error);
    }
  )
 }


 customerData(Exp) {
  // this.spinner.show()
  const obj = {
    "Expression": Exp
  }
  // console.log(obj)
  this.service.postmethod('customersdata/get', obj).subscribe(res => {
    if (res.status == 200) {
      this.customersList = res.response.Details.CustomerDetails
      if(this.customersList.length>0){
        this.isNoRec=true
      }
      // console.log(this.customersList)
      // setTimeout(() => {
      //   this.spinner.hide()
      // }, 1000);
    }
  },
    (error) => {
      console.log(error);
    }
  )
}

  dealerData() {
    this.isStore=true;
    this.isSale=false;
    this.isScore=false;
    this.isService=false;
    this.isBrand = false;
    this.isProximity = false;
    this.isVehicleEquity = false;
    this.veh_class = 'A';

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

  allBrandslist(val){

    if(this.selectedBrandsNames.length == this.brandsList.length){
      this.selectedBrands= [];
      this.selectedBrandsNames =[];
      //this.dealerExp=[];
  }
  else{

    this.selectedBrandsNames= this.brandsList.map(e=>{
      this.selectedBrands.push(e.brand_chrome_id);
      return e.brand_name;
    });
  }
  }

  allDealerslist(val){
    if(this.selectedAttributes.length == this.storesList.length){
      this.selectedAttributes=[];
      this.dealerExp=[];
  }
  else{

    this.selectedAttributes= this.storesList.map(e=>{
      this.dealerExp.push(e.AS_ID);
      return e.AS_ID;
    });
  }

  }

  dealerlist($event,val){
    console.log($event);
    console.log('DealerName',val);
    this.selectedStores.push(val)
    console.log('selected',this.selectedStores);


this.service.setStoreList(this.selectedStores);

   // if($event.target){
      // val.Status = "true"
      // this.dealerExp.push(val.AS_ID.toString())
      if(val.AS_ID !='0'){
        // this.storesList[0].Status = 'false';
        let index = this.dealerExp.indexOf(val.AS_ID)
        // console.log('index',index);

        if(index >= 0){
          this.dealerExp.splice(this.dealerExp.indexOf(val.AS_ID),1);
          this.selectedAttributes.splice(this.selectedAttributes.indexOf(val.AS_ID),1);
        }
        else if(index == -1){
          this.dealerExp.push(val.AS_ID);
          this.selectedAttributes.push(val.AS_ID);
        }
      }
      if(val.store_id =='0'){
        this.dealerExp=[]
        //this.dealerExp.push(val.AS_ID.toString());
        // this.storesList.forEach(ele =>{
        //   if(ele.AS_ID!='0'){
        //     ele.Status="false"
        //   }
        // })
        this.selectedAttributes= this.storesList.map(e=>{
          //this.dealerExp.push(val.AS_ID);
          return e.AS_ID;
        });


      }
      // this.getFilterscore(this.FinalExp)
      // console.log('final', this.getFilterscore(this.FinalExp));
   // }
    // else{
    //   this.dealerExp.splice(this.dealerExp.indexOf(val.AS_ID),1);
    //   val.status='false';
    // }



      // const index = this.selectedDealerIds.findIndex(i => i == val.AS_ID)

      //      if (index >= 0) {

      //        this.selectedDealerIds.splice(index, 1);
      //        this.selectedDealerNames.splice(index,1);

      //      }

      //      else {

      //        this.selectedDealerIds.push(""+val.AS_ID+"");
      //        this.selectedDealerNames.push(val.AS_DEALER_NAME);

      //      }
      //      console.log(this.selectedDealerIds);
      //      console.log(this.selectedDealerNames);


  }


  apply() {

    var filterCount=0;
    var filterExpression =[];

    if(this.selectedAttributes.length == this.storesList.length){
       this.selectedAttributes=[];
       this.dealerExp = [];
       filterCount++;
        filterExpression.push('Store');
    }
    if(this.selectedBrands.length == this.brandsList.length){
         this.selectedBrands =[];
    }

    const obj = {

      selectedAttributes : this.selectedAttributes,
      scoreFrom : this.scoreClicked,
      salesScoreFrom : this.salesScoreValue,
      salesScoreTo : this.salesScorehighValue,
      serviceScoreFrom : this.serviceScoreValue,
      serviceScoreTo : this.serviceScorehighValue,
      // scoreFrom : this.scoreFrom,
      // scoreTo : this.scoreTo,
      salesValueFrom : this.salesFrom,
      salesValueTo : this.salesTo,
      serviceValueFrom: this.servicesFrom,
      ServiceValueTo: this.servicesTo,
      Selectedbrands: this.selectedBrandsNames,
      selectedBrandIds : this.selectedBrands,
      rowCount : this.countForm.controls.rowCount.value,


    }
    this.service.setRetainData(obj);


    //alert(this.scoreFrom)

    // console.log(this.dealerExp);

    this.service.setStoreData({data : this.dealerExp, value : 1})

    // if ((this.scoreTo != '' && this.scoreFrom == '') || (this.scoreTo == '' && this.scoreFrom != '') ||
    //   (this.salesTo != '' && this.salesFrom == '') || (this.salesTo == '' && this.salesFrom != '') ||
    //   (this.servicesFrom != '' && this.servicesTo == '') || (this.servicesFrom == '' && this.servicesTo != '') ||
    //   (parseInt(this.scoreTo) < parseInt(this.scoreFrom)) || (parseInt(this.scoreTo) == parseInt(this.scoreFrom)) ||
    //   (parseInt(this.salesTo) < parseInt(this.salesFrom)) || (parseInt(this.salesTo) == parseInt(this.salesFrom)) ||
    //   (parseInt(this.servicesTo) < parseInt(this.servicesFrom)) || (parseInt(this.servicesTo) == parseInt(this.servicesFrom))) {
    //  // document.getElementById("validation").click();
    // }

    //   if (
    //   (this.salesTo != '' && this.salesFrom == '') || (this.salesTo == '' && this.salesFrom != '') ||
    //   (this.servicesFrom != '' && this.servicesTo == '') || (this.servicesFrom == '' && this.servicesTo != '') ||
    //   (parseInt(this.scoreTo) < parseInt(this.scoreFrom)) ||
    //   (parseInt(this.salesTo) < parseInt(this.salesFrom)) ||
    //   (parseInt(this.servicesTo) < parseInt(this.servicesFrom)) ) {
    //  // document.getElementById("validation").click();
    // }
   // else {
      // this.gotoTop()

      this.FinalExp = "CVP_DealTotalGross !=0 and UCSD_SALES > 0 and UC_FirstName !=''"
      if (this.dealerExp.length > 0 && this.dealerExp[0] != '0') {
        this.FinalExp = this.FinalExp + " and CVP_RelatedStores in ('" + this.dealerExp.map(a => JSON.stringify(a)).join() + "')"
        //this.FinalExp = this.FinalExp.replaceAll('"', "'");
        filterCount++;
        filterExpression.push(' Store');
        // alert(this.FinalExp)


      }


      // if (this.scoreFrom != '' && this.scoreTo != '') {
      //   // this.FinalExp = this.FinalExp + " and UCSD_LTV between " + "'" + this.scoreFrom + "'" + " and " + "'" + this.scoreTo + "'";
      //   this.FinalExp = this.FinalExp + " and (UCSD_LTV >= "  + this.scoreFrom +  " and UCSD_LTV <="  + this.scoreTo+")";
      //   filterCount++
      //   // alert(this.FinalExp)
      // }
     // if(this.scoreClicked !=''){
      if(this.scoreClicked.length == 1){
        if(this.scoreClicked == 'A'){
          this.FinalExp + this.FinalExp ;
          //this.scoreClicked.push('V')
        }

        if(this.scoreClicked == 'V'){
          this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 85 and UCSD_LTV <=100)";
          //this.scoreClicked.push('V')
        }
          if(this.scoreClicked == 'P'){
          this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 80 and UCSD_LTV <85)";
          //this.scoreClicked.push('P')
          }
          if(this.scoreClicked == 'E'){
          this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 70 and UCSD_LTV <=79)";
          //this.scoreClicked.push('E')
          }
          if(this.scoreClicked == 'G'){
          this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 55 and UCSD_LTV <=69)";
          //this.scoreClicked.push('G')
          }
          if(this.scoreClicked == 'N'){
          this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 0 and UCSD_LTV <=54)";
          //this.scoreClicked.push('N')
          }
          filterCount++;
          filterExpression.push(' Score');

      }
    else  if(this.scoreClicked.length > 1){

           if(this.scoreClicked.length == 5){
            this.FinalExp = this.FinalExp;
            //filterCount--;
           }
           else{
            this.FinalExp = this.FinalExp +" and ("
         for(var i=0;i<this.scoreClicked.length;i++ ){

          if(this.scoreClicked[i] == 'V'){
            this.FinalExp = this.FinalExp + " (UCSD_LTV >= 85 and UCSD_LTV <=100)";
            //this.scoreClicked.push('V')
          }
            if(this.scoreClicked[i] == 'P'){
            this.FinalExp = this.FinalExp + "  (UCSD_LTV >= 80 and UCSD_LTV <85)";
            //this.scoreClicked.push('P')
            }
            if(this.scoreClicked[i] == 'E'){
            this.FinalExp = this.FinalExp + "  (UCSD_LTV >= 70 and UCSD_LTV <=79)";
            //this.scoreClicked.push('E')
            }
            if(this.scoreClicked[i] == 'G'){
            this.FinalExp = this.FinalExp + "  (UCSD_LTV >= 55 and UCSD_LTV <=69)";
            //this.scoreClicked.push('G')
            }
            if(this.scoreClicked[i] == 'N'){
            this.FinalExp = this.FinalExp + "  (UCSD_LTV >= 0 and UCSD_LTV <=54)";
            //this.scoreClicked.push('N')
            }
            if(i < this.scoreClicked.length-1)
              this.FinalExp = this.FinalExp + " or ";
         }
         this.FinalExp = this.FinalExp+" )";
         filterCount++;
         filterExpression.push(' Score');
        }

      }
   // }
      // Sales and service related score
      if ((this.salesScoreFrom != 0 || this.salesScoreFrom== 0) && this.salesScoreTo != 0) {
         this.FinalExp = this.FinalExp + " and (UCSD_SALES >= "+  this.salesScoreFrom + " and  UCSD_SALES <=" +  this.salesScoreTo + ") ";
       // this.FinalExp = this.FinalExp + " and (CVP_TotalPrice >= "+  this.salesFrom + " and CVP_TotalPrice <=" +  this.salesTo + ")";
        filterCount++;
        filterExpression.push(' SalesScore');
      }
      if ((this.serviceScoreFrom != 0 || this.serviceScoreFrom ==0) && this.serviceScoreTo != 0) {
        // this.FinalExp = this.FinalExp + " and UCSD_SERVICE between convert(decimal(10,2), "+  this.servicesFrom + ") and convert(decimal(10,2)," +  this.servicesTo + ")";
         this.FinalExp = this.FinalExp + " and (UCSD_SERVICE >= "+  this.serviceScoreFrom + " and UCSD_SERVICE <= " +  this.serviceScoreTo + ") ";
       // this.FinalExp = this.FinalExp + " and (convert(INT, ISNULL(ROUND(CVP_RosRevenue,1,0),0)) >= "+  this.servicesFrom + " and convert(INT, ISNULL(ROUND(CVP_RosRevenue,1,0),0)) <=" +  this.servicesTo + ")";
        filterCount++;
        filterExpression.push(' ServiceScore');

      }



      if ((this.salesFrom != '0' || this.salesFrom=='0') && this.salesTo != '') {
        // this.FinalExp = this.FinalExp + " and UCSD_SALES between "+  this.salesFrom + " and " +  this.salesTo + "";
        this.FinalExp = this.FinalExp + " and (CVP_TotalPrice >= "+  this.salesFrom + " and CVP_TotalPrice <=" +  this.salesTo + ")";
        filterCount++;
        filterExpression.push(' SalesValue');
      }
      if ((this.servicesFrom != '0' || this.servicesFrom == '0') && this.servicesTo != '') {
        // this.FinalExp = this.FinalExp + " and UCSD_SERVICE between convert(decimal(10,2), "+  this.servicesFrom + ") and convert(decimal(10,2)," +  this.servicesTo + ")";
        // this.FinalExp = this.FinalExp + " and UCSD_SERVICE >= convert(decimal(10,2), "+  this.servicesFrom + ") and UCSD_SERVICE <=convert(decimal(10,2)," +  this.servicesTo + ")";
        this.FinalExp = this.FinalExp + " and (convert(INT, ISNULL(ROUND(CVP_RosRevenue,1,0),0)) >= "+  this.servicesFrom + " and convert(INT, ISNULL(ROUND(CVP_RosRevenue,1,0),0)) <=" +  this.servicesTo + ")";
        filterCount++;
        filterExpression.push(' ServiceValue');

      }
      if (this.selectedBrands.length >0) {

        this.FinalExp = this.FinalExp+" and CVP_Brand in("+this.selectedBrands.map((s=>s)).join()+")"
        console.log(this.FinalExp);


        filterCount++;
        filterExpression.push(' Brand');

        // alert(this.FinalExp)

      }
      if (this.proximityValue != 0) {
        this.FinalExp + this.FinalExp;
        filterCount++;
      }
      if (this.VehicleEquityValue != 0) {
        this.FinalExp + this.FinalExp;
        filterCount++;
      }
      if (this.interactionFreqvalue != 0) {
        this.FinalExp + this.FinalExp;
        filterCount++;
      }
      // e.scrollTop = 0;
      //this.customerData(this.FinalExp);
      //this.store.emit(this.FinalExp);

      this.getFilterscore(this.FinalExp)
      console.log('getFilter', this.FinalExp);




      this.service.setFilterExpression({'exp':this.FinalExp,'filterCnt' : filterCount,'FilterValues': filterExpression, 'RowCount' : this.countForm.value.rowCount});
      this.ngbmodal.dismissAll();
   // }


  }



  getFilterscore(exp): Promise<any>{
    return Promise.resolve( (()=>{
    console.log(exp);
  // let  expr ="CVP_DealTotalGross !=0 and UCSD_SALES > 0 and UC_FirstName !='''' and CVP_RelatedStores in (1,4,7) and CVP_Brand in(43,5,9)"
    const Obj={
      "Expression": exp
    }
    this.service.postmethod('customersdata/countoffilters',Obj).subscribe(res=>{
      console.log(res);

      if(res.status == 200){
       this.FilteredData = res.response
        console.log('flist',this.FilteredData);
        if(this.selectedAttributes.length == this.storesList.length){
          this.selectedAttributes =[];
          this.dealerExp=[];
         // this.FilteredData=[];
      }

        this.service.setFilterList(this.FilteredData)

      }

    });
    return;
  })()
    );
  }

  selectedDataGrouping: any = []
  // pushvalue(val) {
  //   if (val.state == false) {
  //     if (this.selectedDataGrouping.length >= 3) {
  //       alert('Select up to 3 Filters only To Group Your Data')
  //     }
  //     else {
  //       val.state = true
  //       this.selectedDataGrouping.push(val)
  //     }
  //   }
  //   else {
  //     val.state = false;
  //     this.selectedDataGrouping.splice(this.selectedDataGrouping.indexOf(val), 1)
  //   }
  //   // console.log(this.selectedDataGrouping)
  // }
  neworused: any = ['New', 'Used']
  retailorlease: any = ['Retail', 'Lease', 'Misc'];
  includeorexclude: any = ['I'];
  dealstatus: any = ['Delivered', 'Capped', 'Finalized'];
   selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  includecharges: any = ['N'];
  Transactorgl: any = ['T'];




  Section:any=['S']
  multipleorsingle(block, e) {
    if (block == 'Section') {
      this.Section = [];
      this.Section.push(e)
    }
    if (block == 'RL') {
      const index = this.retailorlease.findIndex(i => i == e)
      if (index >= 0) {
        this.retailorlease.splice(index, 1)
      }
      else {
        this.retailorlease.push(e)
      }
    }
    if (block == 'PH') {
      this.includeorexclude = [];
      this.includeorexclude.push(e)
    }
    if (block == 'SV') {
      const index = this.dealstatus.findIndex(i => i == e)
      if (index >= 0) {
        this.dealstatus.splice(index, 1)
      }
      else {
        this.dealstatus.push(e)
      }
    }
    if (block == 'SR') {
      const index = this.dealstatus.findIndex(i => i == e)
      if (index >= 0) {
        this.dealstatus.splice(index, 1)
      }
      else {
        this.dealstatus.push(e)
      }
    }
    if (block == 'SC') {
      const index = this.selecttarget.findIndex(i => i == e)
      if (index >= 0) {
        this.selecttarget.splice(index, 1)
      }
      else {
        this.selecttarget.push(e)
      }
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e)
    }
    if (block == 'IC') {
      this.includecharges = [];
      this.includecharges.push(e)
    }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e)

    }
    if(block == 'BR'){
      const index = this.selectedBrands.findIndex(i => i == e)
        if (index >= 0) {
          this.selectedBrands.splice(index, 1)
        }
        else {
          this.selectedBrands.push("'"+e+"'")
        }
    }
  }

  multipleselect(block,e){
    if (block == 'ST') {
      const index = this.selecttarget.findIndex(i => i == e)
      if (index >= 0) {
        this.selecttarget.splice(index, 1)
      }
      else {
        this.selecttarget.push(e)
      }
    }
    console.log(block);
    console.log(e);


  }

  close() {
    this.ngbmodal.dismissAll()
  }

  clear(){
    this.selectedAttributes=[];
    this.dealerExp=[];
    this.scoreFrom=[];
    this.scoreTo='';
    this.salesFrom='';
    this.salesTo='';
    this.servicesFrom='';
    this.servicesTo='';
    this.selectedBrandsNames=[];
    this.selectedBrands=[];
  }
  isAllCust : boolean=true;
  scoreClicked :any =['V','P','E','G','N'];
  IsAllClicked(flag){
    if(flag == 'Y'){
      this.isAllCust = true;
      //this.scoreClicked .push('A');
      this.scoreClicked =['V','P','E','G','N'];

      // var allEid = document.getElementById("btnAllExc")
      // console.log(allEid);
      // allEid.classList.remove('active')

      // var ID = document.getElementById("btnVipInc");
      //   console.log(ID);

      //        ID.classList.add('vipcls');
      //   var ID1 = document.getElementById("btnVipExc")
      //       ID1.classList.remove('vipcls')

      //   var ID2 = document.getElementById("btnPlaInc");
      //        ID2.classList.add('platcls');
      //        var ID3 = document.getElementById("btnPlaExc")
      //        ID3.classList.remove('platcls')

      //   var ID4 = document.getElementById("btnEmeInc");
      //        ID4.classList.add('emecls');
      //        var ID5 = document.getElementById("btnEmeExc")
      //        ID5.classList.remove('emecls')

      //   var ID6 = document.getElementById("btnGoldInc");
      //        ID6.classList.add('goldcls');
      //        var ID7 = document.getElementById("btnGoldExc")
      //        ID7.classList.remove('goldcls')


      //   var ID8 = document.getElementById("btnNewInc");
      //        ID8.classList.add('newcls');
      //        var ID9 = document.getElementById("btnNewExc")
      //        ID9.classList.remove('newcls')
      this.vipcls=true;
      this.platcls=true;
      this.emecls=true;
      this.goldcls=true;
      this.newcls=true;
    }

     else  if(flag == 'N'){
     this.isAllCust = false;
     this.scoreClicked=[];
    //  var ID = document.getElementById("btnVipInc");
    //  console.log(ID);

    //       ID.classList.remove('vipcls');
    //  var ID1 = document.getElementById("btnVipExc")
    //      ID1.classList.add('vipcls')

    //  var ID2 = document.getElementById("btnPlaInc");
    //       ID2.classList.remove('platcls');
    //       var ID3 = document.getElementById("btnPlaExc")
    //       ID3.classList.add('platcls')

    //  var ID4 = document.getElementById("btnEmeInc");
    //       ID4.classList.remove('emecls');
    //       var ID5 = document.getElementById("btnEmeExc")
    //       ID5.classList.add('emecls')

    //  var ID6 = document.getElementById("btnGoldInc");
    //       ID6.classList.remove('goldcls');
    //       var ID7 = document.getElementById("btnGoldExc")
    //       ID7.classList.add('goldcls')


    //  var ID8 = document.getElementById("btnNewInc");
    //       ID8.classList.remove('newcls');
    //       var ID9 = document.getElementById("btnNewExc")
    //       ID9.classList.add('newcls')
    this.vipcls=false;
    this.platcls=false;
    this.emecls=false;
    this.goldcls=false;
    this.newcls=false;
     }
  }
  IsScoreClicked(val,exp){
    var expression='';
    if((val == 'V' || val == 'P' || val == 'E' || val == 'G' || val == 'N' ) && exp == 'I'){
      //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 90 and UCSD_LTV <=100)";
      // var ID = document.getElementById(""+id1+"");
      // ID.classList.add('active');
      // var ID1 = document.getElementById(""+id2+"");
      // ID1.classList.remove('active');
      if(val == 'V'){
        //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 90 and UCSD_LTV <=100)";
        if(this.scoreClicked.indexOf('V') ==-1)
           this.scoreClicked.push('V');
           this.vipcls=true;
      }
        if(val == 'P'){
        //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 80 and UCSD_LTV <=89)";
        if(this.scoreClicked.indexOf('P') ==-1)
        this.scoreClicked.push('P');
        this.platcls=true;
        }
        if(val == 'E'){
        //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 70 and UCSD_LTV <=79)";
        if(this.scoreClicked.indexOf('E') ==-1)
        this.scoreClicked.push('E');
        this.emecls=true;
        }
        if(val == 'G'){
        //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 55 and UCSD_LTV <=69)";
        if(this.scoreClicked.indexOf('G') ==-1)
        this.scoreClicked.push('G');
        // var ID = document.getElementById(""+id1+"");
        // ID.classList.remove();
        // ID.classList.add('goldcls');
        // var ID1 = document.getElementById(""+id2+"");
        // ID1.classList.remove('goldcls');
        this.goldcls=true;
        }
        if(val == 'N'){
        //this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 0 and UCSD_LTV <=54)";
        if(this.scoreClicked.indexOf('N') ==-1)
        this.scoreClicked.push('N') ;
        // var ID = document.getElementById(""+id1+"");
        // ID.classList.remove();
        // ID.classList.add('newcls');
        // var ID1 = document.getElementById(""+id2+"");
        // ID1.classList.remove('newcls');
        this.newcls=true;
        }
        //this.scoreClicked = val;

    }
    else  if((val == 'V' || val == 'P' || val == 'E' || val == 'G' || val == 'N' ) && exp == 'E'){
      this.FinalExp = this.FinalExp + "";
      this.isAllCust = false;
      // var allId = document.getElementById("btnAllExc");
      // allId.classList.add('active');

      // var allIncId = document.getElementById("btnAllInc");
      // allIncId.classList.remove('active');

      // if(this.scoreClicked.indexOf('A') == 0){
      //   this.scoreClicked.splice(this.scoreClicked.indexOf('A'),1);
      //   this.scoreClicked  =['V','P','E','G','N'];
      // }

      if(val == 'V'){

      //   var ID = document.getElementById(""+id2+"");
      //   ID.classList.remove('vipcls');
      //   var ID1 = document.getElementById(""+id1+"");
      //  // ID.classList.remove('active');
      //   ID1.classList.add('vipcls');
        this.scoreClicked.splice(this.scoreClicked.indexOf(val),1)
        this.vipcls=false;

      }
      if(val == 'P'){

      //   var ID = document.getElementById(""+id2+"");
      //   ID.classList.remove('platcls');
      //   var ID1 = document.getElementById(""+id1+"");
      //  // ID.classList.remove('active');
      //   ID1.classList.add('platcls');
        this.scoreClicked.splice(this.scoreClicked.indexOf(val),1);
        this.platcls=false;

      }
      if(val == 'E'){

      //   var ID = document.getElementById(""+id2+"");
      //   ID.classList.remove('emecls');
      //   var ID1 = document.getElementById(""+id1+"");
      //  // ID.classList.remove('active');
      //   ID1.classList.add('emecls');
        this.scoreClicked.splice(this.scoreClicked.indexOf(val),1);
        this.emecls=false;

      }
      if(val == 'G'){

      //   var ID = document.getElementById(""+id2+"");
      //   ID.classList.remove('goldcls');
      //   var ID1 = document.getElementById(""+id1+"");
      //  // ID.classList.remove('active');
      //   ID1.classList.add('goldcls');
        this.scoreClicked.splice(this.scoreClicked.indexOf(val),1);
        this.goldcls=false;

      }
      if(val == 'N'){

      //   var ID = document.getElementById(""+id2+"");
      //   ID.classList.remove('newcls');
      //   var ID1 = document.getElementById(""+id1+"");
      //  // ID.classList.remove('active');
      //   ID1.classList.add('newcls');
        this.scoreClicked.splice(this.scoreClicked.indexOf(val),1);
        this.newcls=false;

      }


    //   var ID = document.getElementById(""+id2+"");
    //   ID.classList.remove('active');
    //   var ID1 = document.getElementById(""+id1+"");
    //  // ID.classList.remove('active');
    //   ID1.classList.add('active');
    }
    if(this.scoreClicked.length == 5){
       this.isAllCust = true;
       var allId = document.getElementById("btnAllExc");
       allId.classList.remove('active');
    }
    else if(this.scoreClicked.length == 0){
      this.isAllCust = false
    }

    }

    onItemChange(e){

    }
    selectedRegions=[];
    // getStoreRegions(){
    //   const obj={"id":"0","exp":"Y"};
    //   this.service.getStoreRegions('axelone/GetStoreGroups',obj).subscribe((res :any)=> {

    //     if(res.status == 200){
    //       this.Regions = res.response;
    //       console.log(this.Regions);

    //     }


    //   });
    // }

    // getStoresData(){
    //   let dataStoreList=[];
    //   const obj={"id":this.selectedRegions,"exp":"Y"};
    //   this.service.getStoreRegions('axelone/GetStoreGroups',obj).subscribe((res :any)=> {

    //     if(res.status == 200){
    //       this.Regions = res.response;
    //       dataStoreList = this.Regions;

    //       this.storesList = dataStoreList

    //       console.log(this.Regions);

    //     }


    //   });
    // }
  }

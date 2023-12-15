import { Component, OnInit,Input, Renderer2, ViewChild,Output,EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import * as CONST from "./constants";
import {Router} from '@angular/router'



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
  scoreFrom:any='';
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



  constructor(private ngbmodal: NgbModal, private service: ApiServiceService) {

    //this.userDetails =(JSON.parse( localStorage.getItem('userdetails')));

   }


  ngOnInit(): void {



    // this.FinalExp = "((UC_Phone1 like '%"+this.searchText+"%') or (UC_Email like '%"+this.searchText+"%') or ((UC_FirstName + ' '+ UC_LastName) like '%"+this.searchText+"%'))"
    // this.customerData(this.FinalExp);


    this.dealerData();
    this.service.setFilterList(this.FilteredData)



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
      if(res.selectedAttributes.length >0){
        this.selectedAttributes=[];

      for(let i=0; i<res.selectedAttributes.length; i++)
      {
        this.selectedAttributes.push(res.selectedAttributes[i])
        this.dealerExp.push(res.selectedAttributes[i]);

      }
    }
      this.scoreFrom  = res.scoreFrom;
      this.scoreTo =res.scoreTo;
      this.salesFrom = res.salesValueFrom;
      this.salesTo = res.salesValueTo;
      this.servicesFrom = res.serviceValueFrom;
      this.servicesTo = res.ServiceValueTo;
      if(res.Selectedbrands.length >0){
        this.selectedBrandsNames=[];
      for(let i=0; i<res.Selectedbrands.length; i++)
      {
        this.selectedBrandsNames.push(res.Selectedbrands[i])


      }
    }

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
  }


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

     this.isLoading =true;
    this.service.getBrandsData().subscribe((res:any) => {
      if (res.status == 200) {
        this.isLoading =false;
        this.brandsList = res.response;


        console.log(this.brandsList);

        // const obj = {
        //   "cora_acct_id": 0,
        //   "DealerShipId": "0",
        //   "DealerShipName": "All",
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
    const obj = {

    "id" : "0"

    };
    this.isLoading =true;
    this.service.getDealerSores('axelone/GetAxelStores',obj).subscribe((res :any)=> {
      if (res.status == 200) {
        this.isLoading =false;
        this.storesList = res.response
        console.log(this.storesList);
        if(this.selectedAttributes.length == 0)
        this.selectedAttributes= this.storesList.map(e=>{
          this.dealerExp.push(e.AS_ID);
          return e.AS_ID;
        });


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
      if(val.AS_ID =='0'){
        this.dealerExp=[]
        //this.dealerExp.push(val.AS_ID.toString());
        // this.storesList.forEach(ele =>{
        //   if(ele.AS_ID!='0'){
        //     ele.Status="false"
        //   }
        // })
        this.selectedAttributes= this.storesList.map(e=>{
          this.dealerExp.push(val.AS_ID);
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


    const obj = {

      selectedAttributes : this.selectedAttributes,
      scoreFrom : this.scoreFrom,
      scoreTo : this.scoreTo,
      salesValueFrom : this.salesFrom,
      salesValueTo : this.salesTo,
      serviceValueFrom: this.servicesFrom,
      ServiceValueTo: this.servicesTo,
      Selectedbrands: this.selectedBrandsNames

    }
    this.service.setRetainData(obj);


    //alert(this.scoreFrom)
    var filterCount=1;
    // console.log(this.dealerExp);

    this.service.setStoreData({data : this.dealerExp, value : 1})

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
        this.FinalExp = this.FinalExp + " and CVP_RelatedStores in (" + this.dealerExp.map(a => JSON.stringify(a)).join() + ")"
        this.FinalExp = this.FinalExp.replaceAll('"', "'");
        //filterCount++
        // alert(this.FinalExp)


      }


      if (this.scoreFrom != '' && this.scoreTo != '') {
        // this.FinalExp = this.FinalExp + " and UCSD_LTV between " + "'" + this.scoreFrom + "'" + " and " + "'" + this.scoreTo + "'";
        this.FinalExp = this.FinalExp + " and (UCSD_LTV >= "  + this.scoreFrom +  " and UCSD_LTV <="  + this.scoreTo+")";
        filterCount++
        // alert(this.FinalExp)
      }
      if (this.salesFrom != '' && this.salesTo != '') {
        // this.FinalExp = this.FinalExp + " and UCSD_SALES between "+  this.salesFrom + " and " +  this.salesTo + "";
        this.FinalExp = this.FinalExp + " and (UCSD_SALES >= "+  this.salesFrom + " and UCSD_SALES <=" +  this.salesTo + ")";
        filterCount++
      }
      if (this.servicesFrom != '' && this.servicesTo != '') {
        // this.FinalExp = this.FinalExp + " and UCSD_SERVICE between convert(decimal(10,2), "+  this.servicesFrom + ") and convert(decimal(10,2)," +  this.servicesTo + ")";
        // this.FinalExp = this.FinalExp + " and UCSD_SERVICE >= convert(decimal(10,2), "+  this.servicesFrom + ") and UCSD_SERVICE <=convert(decimal(10,2)," +  this.servicesTo + ")";
        this.FinalExp = this.FinalExp + " and (UCSD_SERVICE >= "+  this.servicesFrom + " and UCSD_SERVICE <=" +  this.servicesTo + ")";
        filterCount++;

      }
      if (this.selectedBrands.length >0) {

        this.FinalExp = this.FinalExp+" and CVP_Brand in("+this.selectedBrands.map((s=>s)).join()+")"
        console.log(this.FinalExp);


        filterCount++;

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




      this.service.setFilterExpression({'exp':this.FinalExp,'filterCnt' : filterCount});
      this.ngbmodal.dismissAll();
    }


  }



  getFilterscore(exp){
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

        this.service.setFilterList(this.FilteredData)

      }

    })
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
    this.scoreFrom='';
    this.scoreTo='';
    this.salesFrom='';
    this.salesTo='';
    this.servicesFrom='';
    this.servicesTo='';
    this.selectedBrandsNames=[];
    this.selectedBrands=[];
  }
}

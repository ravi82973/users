import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../app/Core/api-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss'],
  providers:[DatePipe]
})
export class CustomersNewComponent implements OnInit {



  customersList: any = [];
  searchText: any='';
  checkboxStatus: any;
  validationErrorMsg: any;
  FinalExp: any;
  FilterExp: any;
  dateExpression:any
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
  // purchaseOpacity:any='N'
  rowsToShow:any = 3;


  selectedFromDate: any;
  selectedToDate:any;
  newFromDate:any;
  newToDate:any;
  selectedSourceType:any='DMS';

  constructor(private api: ApiServiceService,
    private spinner: NgxSpinnerService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    // this.getCustomers();
    // this.FinalExp="(convert(varchar(15), uc_lastactive, 101) between '"+this.newFromDate+"' and '"+this.newToDate+"')";


  }

  fromDateFormat:any;
  toDateFormat:any;
  DateExpression() {

    // this.spinner.show()
    const formattedStartDate = this.formatDate(this.selectedFromDate);
    const formattedEndDate = this.formatDate(this.selectedToDate);
    // Update the dateExpression using the formatted start and end dates
    this.dateExpression = `convert(varchar(15), uc_lastactive, 101) between '${formattedStartDate}' and '${formattedEndDate}'`;

    this.getCustomers();
    // this.spinner.hide();
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const month = this.formatNumber(dateObj.getMonth() + 1);
    const day = this.formatNumber(dateObj.getDate());
    const year = dateObj.getFullYear();
    return `${month}-${day}-${year}`;

  }


  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  getCustomers(){
    // this.spinner.show()
    const obj={
      "dateExpression": this.dateExpression,

      "sourceType": this.selectedSourceType
    }
    console.log(obj);
    this.api.postmethod('customersdata/GetCustomersDataBasedonDate',obj).subscribe(res=>{
      console.log(res);
      if(res.status==200){
        this.customersList=res.response;
        console.log('customers',this.customersList);

      }

        // this.spinner.hide()

    })

  }
  vehicleArray :any=[];
  parseJsonToArray(obj:any){

   return(JSON.parse(obj));

  }
  changeSrcType(e){
    console.log(e);
    this.selectedSourceType = e.target.value;
    console.log('sourceType');
    this.getCustomers()

  }
  // toggleblockandgrid(e){

  //   this.spinner.show()
  //   e == 'block' ? this.block=true: this.block=false;
  //   e =='grid' ? this.grid=true:this.grid=false;
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 1000);




  // }

}

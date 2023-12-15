import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.scss']
})
export class DashboardNewComponent implements OnInit {

  TotalCount:any='';
  title :string="Xiom-Dashboard"
  storeList: any=[];
  FinalExp: any;
scoreClicked :any =[];
  LTVCount: any=[];
  storeId: number=0;
  userid: any='';
 // showSearchBox:any='N';

  constructor(private apiSrvc:ApiServiceService,private spinner: NgxSpinnerService, private router: Router) { 
    this.apiSrvc.getTitle(this.title);
    let userDetails = localStorage.getItem("userdetails");
    this.userid =localStorage.getItem("AxelUserId");
   // this.showSearchBox = 'N';
  }

  ngOnInit(): void {
    this.getCountData(0);
    this.storeId = 0;
    this.dealerList();
  }
  getCountData(storeid){
    this.spinner.show()
    const Obj={
      "storeId": storeid
    }
    //this.apiSrvc.postmethod('ucarsummary/axiomtotalcounts',Obj).subscribe(res=>{
      this.apiSrvc.postmethod('ucarsummary/getcountvariations',Obj).subscribe((res :any)=>{
      if(res.status == 200){
        this.TotalCount=res.response[0];
        console.log('totalcount', this.TotalCount);
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);

      }
    })
  }

  dealerList(){
    const obj = {

      AD_USERID: this.userid,
  
      };
      let dealerStores =[];
    this.apiSrvc.postmethodOne('axelone/GetStoresByUserid',obj).subscribe((res :any)=> {
      if (res.status == 200) {
        //this.isLoading =false;

        const obj = {
          userid: res.response[0].storeids
        }

        this.apiSrvc.postmethodOne('axelone/GetStoreDetailsbyuserid',obj).subscribe((strresponse:any)=>{
           
          if(strresponse.status == 200){
            dealerStores = strresponse.response;
            this.storeList = dealerStores.sort((a,b) => (a.DEALER_NAME < b.DEALER_NAME) ? -1 : 1);
          }
        })


       
        //console.log(this.storesList);
      }
    },
      (error) => {
        console.log(error);
      }
    )
  }

  changeStore(e){

     this.getCountData(e.target.value);
     this.storeId = e.target.value;

  }
  viewButton(val){
    this.scoreClicked=val
console.log('getLTVSCORES',this.FinalExp);

    var filterCount=0;


   
    this.FinalExp = "CVP_DealTotalGross !=0 and UCSD_SALES > 0 and UC_FirstName !=''"

  if(this.scoreClicked == 'V'){
    this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 85 and UCSD_LTV <=100)";
    console.log('vip',this.FinalExp);

  }
  if(this.scoreClicked == 'P'){
    this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 80 and UCSD_LTV <85)";
    console.log('platinum',this.FinalExp);
    
  }
  if(this.scoreClicked == 'E'){
    this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 70 and UCSD_LTV <=79)";
    console.log('Emerald',this.FinalExp);

  }
  if(this.scoreClicked == 'G'){
    this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 55 and UCSD_LTV <=69)";
    console.log('Gold',this.FinalExp);

  }
  if(this.scoreClicked == 'N'){
    this.FinalExp = this.FinalExp + " and (UCSD_LTV >= 0 and UCSD_LTV <=54)";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'O'){
    this.FinalExp = this.FinalExp + " and (CVP_Dealtype in('NEW','USED'))";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'NEW'){
    this.FinalExp = this.FinalExp + " and (CVP_Dealtype = 'NEW')";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'USED'){
    this.FinalExp = this.FinalExp + " and (CVP_Dealtype = 'USED')";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'Multi'){
    this.FinalExp = this.FinalExp + " and (CVP_DealCount > 1)";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'Sales'){
    this.FinalExp = this.FinalExp + " and (UCSD_Sales > 0)";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'Service'){
    this.FinalExp = this.FinalExp + " and (UCSD_Service > 0 and UCSD_Sales = 0)";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'SS'){
    this.FinalExp = this.FinalExp + " and (UCSD_Service > 0 and UCSD_Sales > 0)";
    console.log('New',this.FinalExp);

  }

  if(this.scoreClicked == 'LastYear'){
    this.FinalExp = this.FinalExp + " and year(UC_UpdatedTime ) = YEAR(DATEADD(year,-1,GETDATE())) and (UCSD_Service > 0 or UCSD_Sales > 0)";
    console.log('New',this.FinalExp);

  }



  this.router.navigate(['/customerslist']);
  filterCount++;
  localStorage.setItem("Fromview",'Y');
    this.apiSrvc.setFilterExpression({'exp':this.FinalExp,'filterCnt' : filterCount,'RowCount' : 100});
    this.apiSrvc.setRetainData({ scoreFrom : this.scoreClicked})
   // this.getCountData(this.FinalExp)
  console.log('filterCount',filterCount);


  this.getLTVScore(this.FinalExp)


//this.apiSrvc.setLTVScoreExp(this.FinalExp)



}

getLTVScore(exp){
  console.log(exp);
  const Obj={
    "Expression":exp
  }
  this.apiSrvc.postmethod('customersdata/countoffilters',Obj).subscribe(res=>{
    console.log('res',res);
    if(res.status == 200){
      this.LTVCount = res.response;
      console.log('LTVData',this.LTVCount);
    
      this.apiSrvc.setFilterList(this.LTVCount)
    }

   

  })
}

}

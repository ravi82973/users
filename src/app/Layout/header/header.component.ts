import { Component, EventEmitter, OnInit,Output,ViewChild} from '@angular/core';
import { Router, RouterPreloader,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReportfilterComponent } from 'src/app/Features/reportfilter/reportfilter.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import{ ApiServiceService } from '../../Core/api-service.service';
import { encode, decode } from 'js-base64';
import { PdfService} from '../../Core/_providers/pdf-service/pdf.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalOptions:NgbModalOptions;
  UserName: string;
  RoleName: any;
  url: any='';
  showFilterModel:any="N";

  constructor(private router:Router, private location:Location,private ngbmodal: NgbModal, private apiServic: ApiServiceService,private _Activatedroute: ActivatedRoute, private pdfSrvc : PdfService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

   // this._Activatedroute.queryParams.subscribe(params =>{
    console.log(this.router.url);
      let redirecturl = this.router.url.substring(1);
      if(redirecturl == 'customerslist')
        localStorage.setItem('showmodel', "Y");
      else
         localStorage.setItem('showmodel', "N");
      //alert(localStorage.getItem('token') )
      // if(localStorage.getItem('token') != null){
      //   //this.spinner.show();

      //   let authObj = decode(localStorage.getItem('token'));
      //   console.log(localStorage.getItem('token'));


      //   const tokenObj ={
      //     token : JSON.parse(authObj.slice(0, authObj.lastIndexOf('}') + 1)).session
      //   }

      //   this.apiServic.getSessionToken('axelone/verifyToken', tokenObj).subscribe((resData :any)=>{

      //     if(resData.status == 200){

      //       // let obj={
      //       //   "UserID":JSON.parse(authObj).userid
      //       // }
      //      // this.apiServic.postmethod('users/userexists',obj).subscribe((authData:any)=>{


      //       //  localStorage.setItem("userdetails",JSON.stringify(authData.response[0]));



      //         localStorage.setItem("RedirectFromaxel",'Y');


      //        // localStorage.setItem("UserModules",authData.response[0].moduleids);
      //         if(localStorage.getItem('Redirectflag') == 'Y')
      //         //console.log(localStorage.getItem('navigatepage'));

      //             this.router.navigate(['/'+localStorage.getItem('navigatepage')]);


      //             this.showFilterModel = localStorage.getItem("showmodel");
      //         //this.router.navigate(['dashboard'])

      //      // })

      //     }
      //     else if(resData.status == 403){
      //       window.location.href = "https://dev.axelautomotive.com/";
      //     }
      //   })


      // }
      // else{
      //   //this.spinner.hide();
      //   console.log("Invalid Credentials");
      //   window.location.href = "https://dev.axelautomotive.com/";

      //   //alert("Invalid Credentials")
      // }

  // });
   }



@Output() isFilter = new EventEmitter<any>();
loginUserDetails:any;


  ngOnInit(): void {

  let ReVal =localStorage.getItem("RedirectFromaxel");
  console.log('Val '+localStorage.getItem("RedirectFromaxel"));
  if(ReVal == 'Y'){
    this.loginUserDetails=(JSON.parse( localStorage.getItem('userdetails')));
    console.log(this.loginUserDetails);

    this.UserName = this.loginUserDetails.firstname+' '+this.loginUserDetails.lastname;
    this.RoleName = this.loginUserDetails.title;

  }
  else if(ReVal == 'N'){
    this.loginUserDetails=JSON.parse(localStorage.getItem('userdetails'));
    this.UserName = this.loginUserDetails.User_Firstname+' '+this.loginUserDetails.User_Lastname;
    this.RoleName = this.loginUserDetails.Role_Name;
  }

  }



  logout(){
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('rememberMe')
    this.router.navigate([''])
  }
//   ToggleFilter(){
// this.isFilter.emit(true)
//   }

navTopage(name) {
  if(name!=''){

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.apiServic.setFilterExpression({data:''});
    if(name=='customerslist'){
      localStorage.setItem('showmodel', "Y");
      localStorage.setItem("Fromview",'N');
    }
     else
     localStorage.setItem('showmodel', "N")
    this.router.navigate(['/'+name]);
    localStorage.setItem('navigatepage',name);
  }

}

openModal() {

  const modalRef = this.ngbmodal.open(ReportfilterComponent, {

    size: <any>'xl',
    centered:true,

    // backdrop: "static",

  });

}
Actions(){
  let USerDeatils =this.loginUserDetails;
  let token = {

    uname: this.loginUserDetails.fname + this.loginUserDetails.lname,

    utitle: this.loginUserDetails.title,

    uid: this.loginUserDetails.userid,

    pid: 6,

  };

  var tkn = btoa(JSON.stringify(token));

  this.url = 'https://devtask.axelautomotive.com/dashboard/' + tkn;

  window.open(this.url, '_blank');
}

// for pdf document
getPrint(){

  this.pdfSrvc.printPDF();

  }


}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { AxelOneService } from '../providers/axelone.api';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  userObj:any;
  url:any;
  isLoading:boolean=false;
  constructor(public sanitizer: DomSanitizer,private router:Router) { 
    this.isLoading=true;
    // this.aoser.changehead(true);
    // this.aoser.showfilter(false);
    //  let user: any = localStorage.getItem("userobj");
    //  this.userObj = JSON.parse(user);
     //this.setmessenger();
    //  let usersObj = JSON.parse(localStorage.getItem("userdetails")).userid;
    //  console.log(usersObj);
     
     setTimeout(() => {
       this.isLoading=false;
     }, 2000);
  }

  ngOnInit(): void {
  }
  setmessenger(){
   
    let usersObj = JSON.parse(localStorage.getItem("userdetails"));
    let token={"userid":usersObj.userid,"productid":6}
   var tkn=btoa(JSON.stringify(token));
   this.url='https://axelonechat.axelautomotive.com/'+tkn;
   
   return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    // this.sanitizer.bypassSecurityTrustResourceUrl('https://axelonechat.axelautomotive.com/'+tkn);
   
     }
     close(){
       this.router.navigate(['customerslist']);
     }

}

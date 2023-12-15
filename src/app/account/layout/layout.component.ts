import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  layform:FormGroup;
  shotlist:any;
  conversitionmsg:any;
  ptags:any;
  array:any;
  newdataadded=true;
  newdata=false;
  submitted=false;
  save=false;
  update=false;
  result : any = []
  constructor(public fb:FormBuilder,public srvc:ApiService ,public rtr:Router) {
    this.layform = this.fb.group({
      // action:[""],
      // sc_id:[],
      sc_codename:['',Validators.required],
      sc_name:['',Validators.required],
      // sc_code_type:[""],
      // sc_uid:[],
      // sc_updated_uid:[],
      // sc_status:[""],
      // sc_create_uid:[]
  }); 
  
   }
 
   ngOnInit(): void {
   
   
      let obj={
       "ID":0,
       "expression":""
       }
      this.srvc.postmethod('GetExgShortcodesCust',obj).subscribe(data=>{
        this.shotlist=data;
        console.log(this.shotlist.response,'c');
        this.result = this.shotlist.response
      })
    }
  
   
  get su() { return this.layform.controls; }
adddata()
{
  let sc_codename=this.layform.value.sc_codename
  let sc_name=this.layform.value.sc_name
  const obj={
   
   "action":"A",
   "sc_id":0,
   "sc_codename":sc_codename,
   "sc_name":sc_name,
   "sc_code_type":"t",
   "sc_uid":1,
   "sc_updated_uid":1,
   "sc_create_ts":"",
   "sc_update_ts":"",
   "sc_status":"y",
   "sc_create_uid":"1"
  }
 
  this.srvc.postmethod('audshortcodescust',obj).subscribe(data=>{
    this.shotlist=data;
    console.log(this.shotlist.response,'d');
    this.submitted=false;
    this.newdataadded=true;
    this.newdata=false;
    
 });
}  

   
   additem(){
    this.newdata=true;
    this.newdataadded=false;
    this.save=true;
    this.update=false;
   }
   
   editdata(result:any){
    this.save=false;
    this.update=true;
    this.newdata=true;
    this.newdataadded=false;
    
    let obj={
      "ID":"",
      "expression":""
      }
     this.srvc.postmethod('GetExgShortcodesCust',obj).subscribe(data=>{
      this.shotlist=data;
      this.result = this.shotlist.response
      console.log(this.result,'d');
      this.layform.controls["sc_codename"].setValue(this.shotlist.response.sc_name)
      this.layform.controls["sc_name"].setValue(this.shotlist.response.sc_name) 
  
    })
    
   
   }
   updated(){

  }
   backdata(){
    this.newdataadded=true;
    this.newdata=false;
    
   } 
}

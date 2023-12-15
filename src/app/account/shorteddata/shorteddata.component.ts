import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';



@Component({
  selector: 'app-shorteddata',
  templateUrl: './shorteddata.component.html',
  styleUrls: ['./shorteddata.component.scss']
})
export class ShorteddataComponent implements OnInit {
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
  result : any = [];
  resultId:any =[];
  SC_ID:number;
  SC_STATUS:any;
  isactive:boolean ;
  isinactive:boolean;
  isstatus:boolean
  dummy: any;
  hideall: boolean;
  constructor(public fb:FormBuilder,public srvc:ApiService ,public rtr:Router) {
    this.layform = this.fb.group({
      sc_codename:['',Validators.required],
      sc_name:['',Validators.required],
      SC_STATUS:[''],
  
  }); 

   }
   ngOnInit(): void {
   this.getdata();
   
   this.hideall=true;
}

   
  get su() { return this.layform.controls; }
  getdata(){
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
    this.getdata();
    
 });
 
}    
   additem(){
    this.newdata=true;
    this.newdataadded=false;
    this.save=true;
    this.update=false;
   this.hideall=false
   this.layform.reset();
     }
   
   editdata(shoted:any){
     console.log(shoted);
      this.layform.controls["sc_codename"].setValue(shoted.SC_CODENAME)
      this.layform.controls["sc_name"].setValue(shoted.SC_NAME) 
      this.SC_ID=shoted.SC_ID;
      
    this.save=false;
    this.update=true; 
    this.newdata=true;
    this.newdataadded=false;
    this.hideall=true;
     this.isactive= shoted.SC_STATUS=="Y";
    this.isinactive= shoted.SC_STATUS=="N";
    if(shoted.SC_STATUS=="Y")
    {
      this.layform.controls["SC_STATUS"].setValue(shoted.SC_STATUS)

    }
}

   updated(){  

    if(this.layform.value.SC_STATUS==true)
    {
      this.dummy="Y";
    }
    else
    {
      this.dummy="N";
    }
    const obj={
     "action":"U",
     "sc_id":this.SC_ID,
     "sc_codename":this.layform.value.sc_codename,
     "sc_name":this.layform.value.sc_name,
     "sc_code_type":"t",
     "sc_uid":1,
     "sc_updated_uid":1,
     "sc_create_ts":"",
     "sc_update_ts":"",
     "sc_status":this.dummy,
     "sc_create_uid":1,
    }

    this.srvc.postmethod('audshortcodescust',obj).subscribe(data=>{
      
      console.log(this.layform.value,'U');
      this.submitted=false;
      this.newdataadded=true;
      this.newdata=false;    
      this.getdata();
      this.layform.reset();
      
   });
 
  
  } 
   backdata(){
    this.newdataadded=true;
    this.newdata=false;
    this.layform.reset();
   }

   status(event:any){
    console.log(event);
    if(event.target.checked==true)
    {
      this.isactive = true
      this.isinactive = false
    }
    else
    {
      this.isactive = false
      this.isinactive = true
    }

  }
  change(){

    if(this.layform.value.SC_STATUS===true)
    {
      this.isstatus=true;
      this.isactive=true;
      this.isinactive=false
    }
    else
    {
      this.isstatus=false;
      this.isinactive=true;
      this.isactive=false
    }
    
    
    this.status(event)  
  }
  changed(){

    if(this.layform.value.SC_STATUS===false)
    {
      this.isstatus=false;
      this.isinactive=true;
      this.isactive=false
    }
    else
    {
      this.isstatus=true;
      this.isactive=true;
      this.isinactive=false
    }
    
  }

  

  }
   
   

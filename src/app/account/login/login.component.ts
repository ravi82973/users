import { Component, ElementRef, OnInit, ViewChild,  Output,  
  EventEmitter,  
  Input}  from '@angular/core';
//import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
//import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service'; 
import {PipesModule} from '../../Core/_pipes/pipes.module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./Login2.scss'],
  providers:[PipesModule]
})
export class LoginComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('usermessage') userMessage:any;
    scrolltop:number=0;
    Strform:FormGroup;
    guestform:FormGroup;
    submitted = false;
    signclick = true;
    guestclick=false;
    registerclick=false;
    homeclick=false;
    loginuser:string;
    form: FormGroup;
    ptags:any=[];
    Conversationid:any=0;
    ReceiverId:any=0;
    senderId:any=0;
    tagid:any=0;
    messengerfeed:any=[];
    messages:any=[];
    msg:any=[];
    lmsgid:number=0;
    urlId:any;
    storeId:any;
    storeName:any;
    isButtonVisible = true;
    isButtonEnd=true;
    timeNow:any;
    isSignoutVisible=true;
  constructor(private router: Router,
    private route: ActivatedRoute,private formBuilder: FormBuilder,
    private Api :ApiService,private cookieService: CookieService,
    )
  {
    {   
      this.Strform = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]]
    });    

  this.guestform = this.formBuilder.group({
    action:['A'],
    userid:[''],
    username: ['', [Validators.required,]],
    email:[''],
    password: [''], 
    storeid:['']
}); 
    
} 

this.form = this.formBuilder.group({
  action:['A'],
  userid:[''],
  username: ['', [Validators.required]],
  email:['',[Validators.required,Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  storeid:['']
});

this.senderId = this.cookieService.get('userId');  
this.Conversationid = this.cookieService.get('convId');  
  if(this.senderId!=0 && this.Conversationid !=0){
    this.signclick = false;
    this.guestclick=false;
    this.registerclick=false;
    this.homeclick=true;
    this.loginuser= this.cookieService.get('userName');
    this.GetMessagess('0',this.Conversationid,"D");
    this.PriorityTags();
    if( localStorage.getItem('signoutbtn')=="G"){
      this. isSignoutVisible=false;
    }
  }
}

   get f() { return this.Strform.controls; }
   get gu(){return this.guestform.controls;}
  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.urlId = params.get('id');
  });   
    const obj={"ID": this.urlId};
    this.Api.postmethod('GetDealername',obj).subscribe(res=>{   
        console.log(res);
        this.storeId=res.response[0].AS_ID;
        this.storeName= res.response[0].AS_DEALERNAME;
      // this.Api.selectMouse(this.storeName);
    });
    this.Strform.reset();  
    this.guestform.reset();
    this.form.reset();                
    this.Api.getmessages().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A') {      
      this.GetMessagess(this.lmsgid,message.convid,'D'); 
    }
    });

    this.Api.getpickmessages().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A') {      
        this.GetMessagess(this.lmsgid,message.convid,'D'); 
      }
    });


  }

  PriorityTags(){
    const obj={
      "ID":0,
      "expression":""
    }
    this.Api.postmethod('gettags',obj).subscribe(res=>{   
      this.ptags= res.response;  
      if(localStorage.getItem('tagId')!=""){
        this.tagid=localStorage.getItem('tagId');
      }
    });

  }

  get fu() { return this.form.controls; }

  onLoginSubmit(){
    this.submitted = true;

    if (this.Strform.invalid) {
        return;
    }
    this.cookieService.set('email', this.Strform.value.email);
    this.cookieService.set('password', this.Strform.value.password);  
    let email=this.Strform.value.email;
    const obj={
      "result":email
    }
    this.Api.postmethod('getuserdetails',obj).subscribe(res=>{
      if(res.status==200){  
        this.submitted=false;     
        this.Strform.reset('');
        this.guestclick=false;
        this.signclick=false;
        this.registerclick=false;
        this.isButtonVisible = true;
        this.isButtonEnd=true;
        this.isSignoutVisible=true;
        const user = res.response;
        this.loginuser=user[0].username;
        this.senderId=user[0].userid;
        this.cookieService.set('userId', this.senderId);
        this.cookieService.set('userName',this.loginuser);
        this.PriorityTags(); 
        this.ConversationAction(user[0].userid);         
        this.homeclick=true;
      }    
    });

  }

  ConversationAction(uid:any){
  const obj={
  "CONV_ID":0,
   "FUSERID":uid,
   "AUSERID":0,
   "Conv_TYPE":"I",
   "TagsIDS":0,
   "Store_Id":this.storeId,
   "from":"F"
  }
  this.Api.postmethod('ConvAction',obj).subscribe(res=>{
    if(res.status==200){  
      this.Conversationid=res.response.result.CONV_ID;
      this.cookieService.set('convId', this.Conversationid);
      this.Api.signIn();
    }
  });
 }

  
   onSubmit() {
   
    this.submitted = true;

  if (this.form.invalid) {
      return;
  }

    this.form.controls['action'].setValue('A');
    this.form.controls['userid'].setValue(0);
    this.form.controls['storeid'].setValue( this.storeId);
    
    this.Api.postmethod('auduserdetails',this.form.value).subscribe(res=>{
      if(res.status==200){            
        this.form.reset('');
        this.guestclick=false;
        this.signclick=true;
        this.registerclick=false
        this.submitted=false;
      }    
    })
  };

guestUser(){
  
  this.guestclick=true;
  this.signclick=false;
  this.registerclick=false;
  this.submitted=false;
}
register(){
  this.signclick=false;
  this.registerclick=true;
  this.submitted=false;
  
}
// loginclick(){
//   this.signclick=true;
//   this.registerclick=false;
//   this.submitted=false;
// }
sining(){
  this.signclick=true;
  this.guestclick=false;
  this.submitted=false;
}
guestonSubmit(){
  this.submitted = true;

    if (this.guestform.invalid) {
        return;
    }
    
    this.guestform.controls['action'].setValue('A');
    this.guestform.controls['userid'].setValue(0);
    this.guestform.controls['email'].setValue('');
    this.guestform.controls['password'].setValue('');
    this.guestform.controls['storeid'].setValue( this.storeId);
    this.Api.postmethod('auduserdetails',this.guestform.value).subscribe(response => {
      if(response.status==200){
        this.guestform.reset('');
        this.submitted=false;     
          this.guestclick=false;
          this.signclick=false;
          this.registerclick=false;
          this.isButtonVisible = true;
          this.isButtonEnd=true;
          this.isSignoutVisible=false;
          localStorage.setItem('signoutbtn','G');
           const user = response.response.result;
           this.loginuser='';
           this.senderId=0;
           this.loginuser=user.username;
           this.senderId=user.userid;
           this.cookieService.set('userId', this.senderId);
           this.cookieService.set('userName',this.loginuser);
           this.PriorityTags(); 
           this.ConversationAction(user.userid);          
          this.homeclick=true;
          this.Api.signIn()
      }
      
    })
    
  }
  Signup(){
     this.signclick=true;
     this.registerclick=false;
     this.homeclick=false;
     this.submitted=false;
     this.messages=[];
     this.cookieService.set('userId', '0');
     this.cookieService.set('convId', '0');
     this.cookieService.set('userName','');
     localStorage.setItem('tagId','0');
  }

  ExitChat(){
    const obj={
      convid: this.Conversationid,
      endfrom: "F",   
      userid: this.cookieService.get('userId') }
      this.Api.postmethod('ExgAchievedAction',obj).subscribe(response => {
        if(response.status==200){
        // this.Signup();
        this.isButtonVisible = false;
        this.isButtonEnd=false;
        const msgobj1 = {        
          convid: this.Conversationid,
          message: 'Customer Ended chat',
          type: 'T',
          from: 'F'           
        };
        this.Api.endChat(msgobj1);        
        this.GetMessagess(this.lmsgid,this.Conversationid,'D'); 
        if( localStorage.getItem('signoutbtn')=="G"){
          this. isSignoutVisible=false;
          localStorage.removeItem('signoutbtn');
          this.cookieService.set('userId', '0');
          this.cookieService.set('convId', '0');
          this.cookieService.set('userName','');
          localStorage.setItem('tagId','0');
        }
       
        }
      });
  }

  resisters(){
    this.submitted=false;
  }

  tagsClick(id:any){
    this.tagid=id;
    const obj={
      "conv_id": this.Conversationid,
      "tag_id":this.tagid
    }
    this.Api.postmethod('UpdateTagid',obj).subscribe(response => {
     localStorage.setItem('tagId',this.tagid);
    });
  }

  send(event:any): void {
    if(((event.target.value).trim()).length == 0 ){
      alert("Enter text message")
    } else {
      this.Bindmessenger(event.target.value, 'T');
      event.target.value="";
    }
  }

  Bindmessenger(chatdesc:any, msgtype:any){
    
    const obj={
      action:'A',
      MSG_ID:0,
      MSG_CONV_ID:this.Conversationid,
      MSG_GR_ID:0,
      MSG_FROM_UID:this.senderId,
      MSG_TO_UID:this.ReceiverId,
      MSG_DESC:chatdesc,
      MSG_STATUS:'Y',
      Conv_type:msgtype,
      Msg_Category:"I",
      MSG_FROM:'F',
      userlist:""
    }
    this.Api.postmethod('ExgMessangerAction',obj).subscribe(res=>{
      if(res.status==200){
       this.lmsgid=res.response.result.MSG_ID;
       let obj1={
         // RowNo : res.response.actiontype,          
          MSG_ID:res.response.result.MSG_ID,
          MSG_CONV_ID:this.Conversationid,
          MSG_FROM_UID:this.senderId,
          MSG_DESC:chatdesc,
          MSG_CREATEDTS:this.timeFormat(), 
          MSG_STATUS:"Y",
          MSG_TYPE:"TI",
          MSG_ParentId:0,
          MSG_FROM:'F',
          UserName: this.cookieService.get('userName')          
          }
          this.messages.push(obj1);
          setTimeout(() => { this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight; }, 500);

        const msgobj = {
          fromid: this.senderId,
          toid:  this.ReceiverId,
          convid: res.response.result.MSG_CONV_ID,
          message: chatdesc,
          type: 'T',
          flag: true,
          lastMsgId: res.response.result.MSG_ID,
          dealerid: this.storeId,
          from: res.response.result.MSG_FROM           
        };
       this.Api.sendMessage(msgobj);     
      }    
    });
  }

  timeFormat() {
    let hours = new Date().getHours();
    let minutes:any = new Date().getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

  return  this.timeNow = strTime;
  }

  myClickFunction(): void {
    if(((this.userMessage.nativeElement.value).trim()).length == 0 ){
      alert("Enter text message")
    } else {
    this.Bindmessenger(this.userMessage.nativeElement.value, 'T');
    this.userMessage.nativeElement.value = '';;
    }
  }

  GetMessagess(msgid:any,convid:any,flag:any)
  {
    const obj= {
      "MSG_ID":msgid,
      "CONV_ID":convid,
      "Flag":flag,
      "userid":this.senderId,
      "from":"F"
      }
      this.Api.postmethod('GetMessages',obj).subscribe(res=>{
        res.response.reverse().filter((item:any)=>{
          this.messages.push(item);
        if(item.MSG_TYPE=='E'){this.isButtonVisible = false; this.isButtonEnd=false;}
        })

        this.lmsgid=this.messages[this.messages.length-1].MSG_ID;    
       setTimeout(() => { this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight; }, 500);                               
      });
  }


}

  


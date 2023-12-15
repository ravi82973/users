import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xiomicon',
  templateUrl: './xiomicon.component.html',
  styleUrls: ['./xiomicon.component.scss']
})
export class XiomiconComponent implements OnInit {

  rightIcon:boolean=true;
  leftIcon:boolean=false;
  modIds:any=[];
  constructor() { }

  ngOnInit(): void {

    let userModInfo:any;
    this.modIds= JSON.parse( localStorage.getItem("userdetails"));
   
  }

  RightIcon(){
    this.rightIcon=false;
    this.leftIcon=true;
  }
  LeftIcon(){
    this.leftIcon=false;
    this.rightIcon=true;
  }
  OpenUrl(val){
    if(val == 1){
        window.open("https://dev.axelxtract.com?token="+localStorage.getItem("token"), "_blank");
    }
    if(val == 2){
      window.open('https://devexagent.axelautomotive.com/'+localStorage.getItem("token"),'_blank');
   }
    if(val == 3){
      window.open("https://dev.axeltouchxpress.com?token="+localStorage.getItem("token"), "_blank");
  }
  if(val == 4){
      window.open("https://devtrax.axelautomotive.com/deallog?token="+localStorage.getItem("token"), "_blank");
  }
  if(val == 5){
    window.open('https://devtrack.axelxperience.com/auth?token='+localStorage.getItem("token")+'&type=3',"_blank");
  }
  }
}

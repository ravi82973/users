import { Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from "@angular/animations";
import { SidebarOpenAnimation, SidebarCloseAnimation } from "./animations";
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { environment} from '../../../environments/environment';

const animationParams = {
  menuWidth: "250px",
  animationStyle: "500ms ease"
};

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  animations: [
    trigger("sideMenu", [
      transition(":enter", [
        useAnimation(SidebarOpenAnimation, {
          params: {
            ...animationParams
          }
        })
      ]),
      transition(":leave", [
        useAnimation(SidebarCloseAnimation, {
          params: {
            ...animationParams
          }
        })
      ])
    ])
  ]
})
export class LeftPanelComponent implements OnInit {

  usersData: any =[];
  isOpen = false;
  imageUrl = `${environment.apiUrl}`;
  image = this.imageUrl + 'resources/images/';
  constructor(private apiSrvc : ApiService ,private router:Router){}
  ngOnInit(): void {
    this. getUsers();
  this.apiSrvc.getSideMenu().subscribe((res : any) =>{ 
    if(res['val'] == 1)
    {
    this.closenav(res['data'])
    }
  })
  }
  closenav(e) {
     if (e.target.className !== 'fas fa-bars ng-tns-c46-0' ) {
      this.isOpen = false
    }
     if (e.target.className == 'fas fa-bars ng-tns-c46-0' || e.target.className == 'side-menu ng-tns-c46-0 ng-trigger ng-trigger-sideMenu ng-star-inserted' ) {
       console.log(e.target.className );
     this.isOpen = true
    }
  }
  
  LogOut(){
    this.router.navigate(['']);
  }

   getUsers(){
    let obj = {
      "Id": "221",
      "Expression": ""
  }
    this.apiSrvc.postmethod('users/get',obj).subscribe(res=>{
      console.log(res);
      this.usersData = res.response;
      console.log('Users' ,this.usersData)
    })
   }
}

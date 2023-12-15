import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {ApiServiceService} from '../../Core/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { encode, decode } from 'js-base64';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  rememberMe:boolean;
  isShow:boolean=true;
  email='pchavali@gmail.com';
  password='1234';
  constructor(private fB: FormBuilder, private Router: Router,private api:ApiServiceService, private _Activatedroute: ActivatedRoute,private spinner: NgxSpinnerService,) {
    localStorage.setItem('showmodel', "N");
    // Router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     let currentUrl = event.url;
    //     console.log(currentUrl);
    //    if (currentUrl.length > 1) {
    //      let result=currentUrl.split('%')
    //      if(result[0].slice(2)== this.email && result[1] == this.password){
    //       const userdata ={
    //        User_Firstname:'Prasad',
    //        User_Lastname:'Chavali',
    //        Role_Name:'General Manager'
    //       }
    //       localStorage.setItem('userdetails', JSON.stringify(userdata))
    //          this.Router.navigate(['/customerslist'])
    //         }
    //         else{
    //           this.isShow=true;
    //         }
    //       }
    //       else{
    //         this.isShow=true;
    //       }
    //   };

    // });
    // this._Activatedroute.queryParams.subscribe(params =>{
    //   //alert('hi')
    //   let UserId= params.token;
    //   if(UserId != undefined)
    //   {
    //   localStorage.setItem("token",UserId);
    //   localStorage.setItem("Redirectflag",'Y');

    //  // console.log(localStorage.getItem('token'));
    //   //alert(localStorage.getItem('token') )


    //  // console.log(UserId);

    //   if(localStorage.getItem('token') != null){
    //     this.spinner.show();

    //     let authObj = decode(localStorage.getItem('token'));
    //     console.log(authObj);
    //     localStorage.setItem('AxelUserId',JSON.parse(authObj).userid );

    //     const tokenObj ={
    //       token : JSON.parse(authObj.slice(0, authObj.lastIndexOf('}') + 1)).session
    //     }

    //     this.api.getSessionToken('axelone/verifyToken', tokenObj).subscribe((resData :any)=>{

    //       if(resData.status == 200){


    //         let obj={"userid":JSON.parse(authObj).userid}

    //         this.api.postmethodOne('axelone/AxelOneUserinfo',obj).subscribe((authData:any)=>{
    //           console.log(authData);
    //           let decodeData = jwt_decode(authData.response);
    //           console.log(decodeData);


    //           localStorage.setItem("userdetails",JSON.stringify(decodeData));



    //           localStorage.setItem("RedirectFromaxel",'Y');


    //           localStorage.setItem("UserModules",authData.response[0].moduleids);
    //           this.Router.navigate(['dashboard'])
    //           localStorage.setItem('Redirectflag','');
    //           this.spinner.hide()
    //         })

    //       }
    //       else if(resData.status == 403){
    //        // alert(resData.status)
    //         window.location.href = "https://dev.axelautomotive.com/";
    //       }
    //     })


    //   }
    //   else{
    //     this.spinner.hide();
    //     console.log("Invalid Credentials");
    //     window.location.href = "https://dev.axelautomotive.com/";

    //     //alert("Invalid Credentials")
    //   }
    // }
    // else{
    //   window.location.href = "https://dev.axelautomotive.com/";
    // }
    // })

    this.loginForm = this.fB.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}$')]],
      password: ['', [Validators.required]],
      remember:[]
    })
  }

  ngOnInit(): void {
    this.loginForm.controls.email.setValue(localStorage.getItem('email'));
    this.loginForm.controls.password.setValue(localStorage.getItem('password'));
    localStorage.getItem('rememberMe')=="true"? this.loginForm.controls.remember.setValue(true):this.loginForm.controls.remember.setValue(false)
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      const obj={
        "Email": this.loginForm.value.email,
        "Password":this.loginForm.value.password,
      }
      this.api.postmethod('authenticate/signin',obj).subscribe(res=>{
      if(res.status==200){
      const userdata = JSON.stringify(res.response)
      localStorage.setItem('userdetails', userdata);
      localStorage.setItem("RedirectFromaxel",'N');
      this.Router.navigate(['dashboard'])
     }
     else{
      alert('Invalid Credentials')
     }
      },
      (error) => {
               console.log(error);
      }
      )
//       if (this.loginForm.value.email == 'pchavali@gmail.com' && this.loginForm.value.password == '1234') {
//         this.Router.navigate(['/dashboard'])
//       }
//       else {
// alert('Invalid Credentials')
//       }
    }
  }
  remember(e) {
    if (e.target.checked) {
      localStorage.setItem('email', this.loginForm.value.email);
      localStorage.setItem('password', this.loginForm.value.password);
      localStorage.setItem('rememberMe', e.target.checked);
    }
    else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMe', e.target.checked);
    }
  }

}

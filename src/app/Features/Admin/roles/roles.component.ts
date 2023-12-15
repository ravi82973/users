import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import { AbstractControl,FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  RolesData:any=[];

  RoleID=0;

  RolesForm: FormGroup = new FormGroup({
    RoleName: new FormControl('')
  })
  submitted= false;

  Status: any = "Y";
  StatusHide: boolean;
  hide:boolean;

  AddSave: boolean = false;
  EditSave: boolean = false;

  public showGrid:boolean = true;
  public showAddRoles:boolean = false;
  // public buttonName:any = 'Show';

  // AddRoles:string='add roles';
  // editRoles:string='edit roles';
  SearchValue:any;
  title:string="Xiom-Roles"

  @ViewChild('content',{static: false}) el!: ElementRef;
  constructor(private apiSrvc:ApiServiceService,private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.RolesForm= this.fb.group({
      RoleName:['',[Validators.required]]
    });
    this.apiSrvc.getTitle(this.title)
  }

  ngOnInit(): void {
    console.log('roles');
    this.GetRoles();
  }

  GetRoles(){
    this.spinner.show()
    const Obj={
      "ID": '',
      "expression": ""
    }
    this.apiSrvc.postmethod('roles/getroles',Obj).subscribe(res=>{

      if(res.status == 200){
        this.RolesData=res.response;
        console.log('roles',this.RolesData);
        this.hide=true;
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);

      }

    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.RolesForm.controls;

  }
  AddShowPanel(){
    this.submitted=false;
    this.RolesForm.reset();
    this.showGrid = !this.showGrid;
    this.showAddRoles=!this.showAddRoles;
    this.StatusHide = false;
    this.AddSave = true;
    this.EditSave = false;

  }

  EditShowPanel(data){
    this.RoleID=data.RoleId;
    this.RolesForm.controls["RoleName"].setValue(data.RoleName);
    this.Status=data.RoleStatus;
    this.showGrid = !this.showGrid;
    this.showAddRoles=!this.showAddRoles;
    this.StatusHide = true;
    this.AddSave = false;
    this.EditSave = true;
    console.log('data',data);

  }

  onSubmit(){
    this.submitted=true;
    if (this.RolesForm.invalid) {return}
    if(this.AddSave){
      this.AddRole();
    }else{
      this.UpdateRole();
    }
  }
  AddRole(){
    this.submitted = true;
    if (this.RolesForm.invalid) {return}
    const Obj ={
      "RoleName": this.RolesForm.value.RoleName,
      "RoleStatus": "Y"
    }
    this.apiSrvc.postmethod('roles',Obj).subscribe(response =>{
      console.log(response);
      if(response.status==200){
        alert(response.response);
        this.GetRoles();
        this.submitted = false;
        this.showGrid = !this.showGrid;
        this.showAddRoles=!this.showAddRoles;
        this.RolesForm.reset();
      }


    })
  }

  UpdateRole(){
    this.submitted = true;
    if (this.RolesForm.invalid) {
      return;
    }
    const Obj ={
      "Roleid": this.RoleID,
    "RoleName": this.RolesForm.value.RoleName,
    "RoleStatus": this.Status
    }
    this.apiSrvc.putmethod('roles',Obj).subscribe(response =>{
      console.log(response);
      if(response.status==200){
        alert(response.response);


        // this.submitted = false;
        this.showGrid = !this.showGrid;
        this.showAddRoles=!this.showAddRoles;
        this.GetRoles();
        // window.location.reload();
        this.RolesForm.reset();
      }

    })
  }
  checkStatus(e:any) {
    let target =e.target;
    if (target.checked) {
      this.Status = "Y";
    }
    else  {
      this.Status = "N";
    }
  }
  onclose(){
    this.submitted = false;
    this.showAddRoles=!this.showAddRoles;
    this.showGrid = !this.showGrid;

  }
  // makePDF(){
  //   let pdf = new jsPDF();
  //   pdf.text(this.RolesData, 10, 10);
  //   pdf.save();
  //   console.log(pdf);

  // }
 
}

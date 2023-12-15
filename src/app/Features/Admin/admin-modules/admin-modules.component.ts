import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-modules',
  templateUrl: './admin-modules.component.html',
  styleUrls: ['./admin-modules.component.scss']
})
export class AdminModulesComponent implements OnInit {

  ModulesData:any=[]; 

  ModuleId:any;

  SubModulesData: any =[];
  Sub_Module_Id:any;

  ModulesForm: FormGroup= new FormGroup({
    Module_Name: new FormControl(''),
    Module_Sequence:new FormControl('')
  })

  SubModulesForm: FormGroup= new FormGroup({
    SubModule_Name: new FormControl(''),
    SubModule_FileName: new FormControl(''),
    SubModule_Sequence: new FormControl(''),
  })
  submitted= false;

  Status: any = "Y";
  SM_Status:any= "Y";
  StatusHide: boolean = false;
  SM_StatusHide: boolean = false;
  hide:boolean;

  AddSave: boolean = false;
  EditSave: boolean = false;
  SM_AddSave: boolean = false;
  SM_EditSave: boolean = false;
  AddEditPanel: boolean = false;
  SM_AddEditPanel: boolean = false;

  public showGrid:boolean = true;
  public showAddRoles:boolean = false;

  public SM_showGrid:boolean = true;
  public SM_showAdd:boolean = false;

  SearchValue:any;
  title:string="Xiom-Modules"
  // Sub_Mod_Id: any;
  // SM_AddEditPanel: boolean;

  constructor(private apiSrvc:ApiServiceService, private fb: FormBuilder,private spinner: NgxSpinnerService) {
    this.ModulesForm = this.fb.group({
      Module_Name:['',[Validators.required, Validators.pattern('[a-zA-Z /()]*')]],
      Module_Sequence: ['', [Validators.required]]
    });

    this.SubModulesForm = this.fb.group({
      SubModule_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z /()]*')]],
      SubModule_FileName: ['', [Validators.required]],
      SubModule_Sequence: ['', [Validators.required]]
    });
    this.apiSrvc.getTitle(this.title)
   }

  ngOnInit(): void {
    this.getModules();
    // this.Sub_Module_Id
  }

  getModules(){
    this.spinner.show()
    const Obj={
      "mod_id": ""
    }
    this.apiSrvc.postmethod('modules/get',Obj).subscribe(res=>{
      if(res.status == 200){
        this.ModulesData=res.response;
        console.log('modules',this.ModulesData);
        this.hide=true;
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ModulesForm.controls;

  }

  get f1(): { [key: string]: AbstractControl } {
    return this.SubModulesForm.controls;

  }
  AddShowPanel(){
    this.submitted=false;
    this.ModulesForm.reset();
    this.showGrid = !this.showGrid;
    this.showAddRoles=!this.showAddRoles;
    this.SM_showGrid = false;

    this.StatusHide = false;
    this.AddSave = true;
    this.EditSave = false;

  }

  EditShowPanel(data){
    this.ModuleId=data.mod_id
    this.ModulesForm.controls["Module_Name"].setValue(data.mod_name);
    this.ModulesForm.controls["Module_Sequence"].setValue(data.mod_seq)
    this.Status=data.mod_status;

    this.showGrid = !this.showGrid;
    this.showAddRoles=!this.showAddRoles;
    //  this.SM_showAdd=!this.SM_showAdd;
    this.SM_showGrid = true;
    this.StatusHide = true;
    this.AddSave = false;
    this.EditSave = true;

    console.log('data',data);
    this.getSubModules(data);
  }

  onSubmit(){
    this.submitted=true;
    if (this.ModulesForm.invalid) {return}
    if(this.AddSave){
      this.AddModule();
    }else{
      this. UpdateModule();
    }
  }

  AddModule(){
    this.submitted=true;
    if(this.ModulesForm.invalid) {return false;}

    const Obj={
      "mod_seq": this.ModulesForm.value.Module_Sequence,
      "mod_name": this.ModulesForm.value.Module_Name,
      "mod_status": "Y"

    }
    this.apiSrvc.postmethod('modules', Obj).subscribe(response =>{
      console.log(response);
      if(response.status==200){
        alert(response.response);
        this.getModules();
        this.submitted=false;
        this.showGrid = !this.showGrid;
        this.showAddRoles=!this.showAddRoles;
        this.ModulesForm.reset();

      }

    })

  }

  UpdateModule(){
    this.submitted = true;
    if (this.ModulesForm.invalid) { return false;}

    const Obj = {
      "mod_id": this.ModuleId,
      "mod_seq": this.ModulesForm.value.Module_Sequence,
      "mod_name": this.ModulesForm.value.Module_Name,
      "mod_status": this.Status
    }
    this.apiSrvc.putmethod('modules',Obj).subscribe(response =>{
      console.log(response);
      if(response.status == 200){
        alert(response.response);
        this.getModules();
        this.submitted=false;
        this.showGrid = !this.showGrid;
        this.showAddRoles=!this.showAddRoles;
        this.ModulesForm.reset();
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

  //sub Modules

  Sub_object: any;

  getSubModules(value){

    this.spinner.show();
    this.Sub_object = value;
    // console.log(value);
    this.Sub_Module_Id = value.mod_id;

    const Obj = {
      "modId": this.Sub_Module_Id,
      "subId": "0",
      "expression": ""
    }
    this.apiSrvc.postmethod('submodules/get', Obj).subscribe(res =>{
      this.SubModulesData = res.response;
      console.log(this.SubModulesData);
      this.hide=true;
      setTimeout(() => {
        this.spinner.hide()
      }, 1000);
    })

  }

  SubModuleAddPanel(){
    this.submitted= false;
    this.SubModulesForm.reset();
    this.SM_showGrid = !this.SM_showGrid;
    this.SM_showAdd=!this.SM_showAdd;
    // this.showGrid = !this.showGrid;
    this.showAddRoles=!this.showAddRoles;
    this.SM_StatusHide = false;
    this.SM_AddSave = true;
    this.SM_EditSave = false;

  }

  SM_Object:any;
  SubModuleEditPanel(value){
    this.SM_Object = value;
    // console.log(this.SM_Object);

    this.SubModulesForm.controls["SubModule_Name"].setValue(value.smod_name);
    this.SubModulesForm.controls["SubModule_FileName"].setValue(value.smod_filename);
    this.SubModulesForm.controls["SubModule_Sequence"].setValue(value.smod_seq);
    // this.SubModulesForm.controls["SM_DisplayStatus"].setValue(value.smod_active);
    this.SM_Status=value.smod_active;
    this.SM_showGrid = !this.SM_showGrid;
    this.SM_showAdd=!this.SM_showAdd;
    this.showAddRoles=!this.showAddRoles;
    this.SM_StatusHide = true;
    this.SM_AddSave = false;
    this.SM_EditSave = true;
    console.log(value);
    // console.log('data',data);
  }

  Submit(){
    this.submitted=true;
    if (this.SubModulesForm.invalid) {return}
    if(this.SM_AddSave){
      this.AddSubModule();
    }else{
      this.UpdateSubModule();
    }
  }
  AddSubModule(){
    this.submitted = true;
    if(this.SubModulesData.invalid){return}

    const Obj = {
      "smod_mod_id": this.Sub_Module_Id,
      "smod_name": this.SubModulesForm.value.SubModule_Name,
      "smod_filename": this.SubModulesForm.value.SubModule_FileName,
      "smod_seq": this.SubModulesForm.value.SubModule_Sequence,
      "smod_active": "Y",
    }
    console.log(Obj);

    this.apiSrvc.postmethod('submodules',Obj).subscribe(response =>{
      if(response.status==200){
        alert(response.response);
        this.showAddRoles=!this.showAddRoles;
        this.SM_showGrid = !this.SM_showGrid;
        this.SM_showAdd=!this.SM_showAdd;
        this.getSubModules(this.Sub_object);
       //  this.EditShowPanel(this.Sub_object);
        // this.SM_AddEditPanel = false;


        this.SubModulesForm.reset();

      }
    })
  }

  UpdateSubModule(){
    // console.log(this.SM_Object);
     this.submitted = true;
     if (this.SubModulesForm.invalid) {return}

     const Obj = {
       "smod_id": this.SM_Object.smod_id,
       "smod_mod_id": this.SM_Object.smod_mod_id,
       "smod_name": this.SubModulesForm.value.SubModule_Name,
       "smod_filename": this.SubModulesForm.value.SubModule_FileName,
       "smod_seq": this.SubModulesForm.value.SubModule_Sequence,
       "smod_active": this.SM_Status,
      //  "smod_display_status": this.SubModulesForm.value.SM_DisplayStatus
     }
     this.apiSrvc.putmethod('submodules', Obj).subscribe(response=> {
       console.log(response);
       alert(response.response);
       this.getSubModules(this.Sub_object);
       this.showAddRoles=!this.showAddRoles;
       this.SM_showGrid = !this.SM_showGrid;
       this.SM_showAdd=!this.SM_showAdd;

      //  this.EditShowPanel(this.Sub_object);
      //  this.SM_AddEditPanel = false;


       this.SubModulesForm.reset();
     })

  }
  SM_checkStatus(e:any) {
    let target =e.target;
    if (target.checked) {
      this.SM_Status = "Y";
    }
    else  {
      this.SM_Status = "N";
    }
  }
  SM_close(){
    this.submitted = false;
    this.SM_showGrid = !this.SM_showGrid;
    this.SM_showAdd=!this.SM_showAdd;
    this.showAddRoles=!this.showAddRoles;
    // this.showGrid = !this.showGrid;
  }
}

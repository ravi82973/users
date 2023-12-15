import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Core/api-service.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-jobtitle',
  templateUrl: './jobtitle.component.html',
  styleUrls: ['./jobtitle.component.scss'],
})
export class JobtitleComponent implements OnInit {
  JobtitleData: any = [];
  RoleID: any;
  ID: any;
  RolesData: any = [];

  JobForm: FormGroup = new FormGroup({
    Job_Title: new FormControl(''),
    Role_Name: new FormControl(''),
  });

  submitted = false;

  Status: any = 'Y';

  selectValue = '';

  StatusHide: boolean;
  AddSave: boolean = false;
  EditSave: boolean = false;
  hide: boolean;

  public showGrid: boolean = true;
  public showAddRoles: boolean = false;
  // public buttonName:any = 'Show';

  SearchValue: string;
  title: string = 'Xiom-Job Titles';

  constructor(
    private apiSrvc: ApiServiceService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.JobForm = this.fb.group({
      Job_Title: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z .&/-]*')],
      ],
      Role_id: ['', [Validators.required]],
    });
    this.apiSrvc.getTitle(this.title);
  }

  ngOnInit(): void {
    console.log('roles');
    this.GetJobRoles();
    this.GetRoles();
  }

  GetJobRoles() {
    this.spinner.show();
    const Obj = {
      ID: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/getjobwithroles', Obj).subscribe((res) => {
      if (res.status == 200) {
        this.JobtitleData = res.response;
        console.log('JobTitle', this.JobtitleData);
        this.hide = true;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
    });
  }
  GetRoles() {
    const Obj = {
      ID: '',
      expression: '',
    };
    this.apiSrvc.postmethod('roles/getroles', Obj).subscribe((res) => {
      if (res.status == 200) {
        this.RolesData = res.response;
        console.log('roles', this.RolesData);
      }
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.JobForm.controls;
  }

  AddShowPanel() {
    this.RoleID = '';
    this.selectValue = '';
    this.submitted = false;
    this.JobForm.reset();
    this.showGrid = !this.showGrid;
    this.showAddRoles = !this.showAddRoles;
    this.StatusHide = false;
    this.AddSave = true;
    this.EditSave = false;
  }
  EditShowPanel(data) {
    this.ID = data.Id;
    console.log('this', this.RoleID);

    this.JobForm.controls['Job_Title'].setValue(data.JobTitle);
    this.JobForm.controls["Role_id"].setValue(data.RoleId);

    this.selectValue = data.RoleName;
    this.Status = data.Status;
    this.showGrid = !this.showGrid;
    this.showAddRoles = !this.showAddRoles;
    this.StatusHide = true;
    this.AddSave = false;
    this.EditSave = true;
    console.log('data', data);
    for (let i = 0; i < this.RolesData.length; i++) {
      if (this.RolesData[i].RoleName == data.RoleName) {
        this.RoleID = this.RolesData[i].RoleId;
        console.log('RolesIDD', this.RoleID);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.JobForm.invalid) {
      return;
    }
    if (this.AddSave) {
      this.AddJob();
    } else {
      this.UpdateJob();
    }
  }
  onselect(e: any) {
    console.log(typeof e.target.value);
    var id = e.target.value.split("", 1)
    this.RoleID = id[0]
    console.log('store', this.RoleID);

  }
  AddJob() {
    this.submitted = true;

    if (this.JobForm.invalid) {
      return;
    }
    const Obj = {
      "JobTitle": this.JobForm.value.Job_Title,
      "RoleName": this.JobForm.value.Role_id,
      "RoleId": this.RoleID,
      "Status": 'Y',
    };
    console.log('add', Obj);

    this.apiSrvc.postmethod('roles/jobwithroles',Obj).subscribe(response =>{
      console.log(response);
      if(response.status==200){
        alert(response.response);
        this.GetJobRoles();
        this.submitted = false;
        this.showGrid = !this.showGrid;
        this.showAddRoles=!this.showAddRoles;
        this.JobForm.reset();
      }
      else{
        alert(response.error)
      }

    })
  }
  UpdateJob() {
    this.submitted = true;
    if (this.JobForm.invalid) {
      return;
    }
    const Obj = {
      "Id": this.ID,
      "JobTitle": this.JobForm.value.Job_Title,
      "RoleName": this.JobForm.value.Role_id,
      "RoleId": this.RoleID,
      "Status": this.Status,
    };
    this.apiSrvc.putmethod('roles/jobwithroles', Obj).subscribe((response) => {
      console.log(response);
      if (response.status == 200) {
        alert(response.response);
        this.showGrid = !this.showGrid;
        this.showAddRoles = !this.showAddRoles;
        this.GetJobRoles();
        this.JobForm.reset();
      } else {
        alert(response.error);

      }
    });
  }

  checkStatus(e: any) {
    let target = e.target;
    if (target.checked) {
      this.Status = 'Y';
    } else {
      this.Status = 'N';
    }
  }
  onclose() {
    this.submitted = false;
    this.showAddRoles = !this.showAddRoles;
    this.showGrid = !this.showGrid;
  }
}

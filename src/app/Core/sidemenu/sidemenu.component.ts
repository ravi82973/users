import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery'
declare let $ : any

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @ViewChild('menu', { static: false }) menu: ElementRef;
  SideMenuData: any = "";
  ParentModules: any = [];
  ParentModulesImg: any = [];
  SModuleArray: any = [];
  currentUrl: any = '';
  activeModuleId: any = 0;
  mainmodule: any;
  ActiveMenu: any = "";
  constructor(
    private api: ApiService, 
    private router: Router
    ) { }
    myOffCanvas : any;
    class : any = "offcanvas offcanvas-start";
  ngOnInit() {
    this.api.getRoleID().subscribe(Codes => this.SideMenu(Codes));
  }

 

  SideMenu(Codes) {
    this.ParentModules = [];
    if (Codes == '0') {
      Codes = localStorage.getItem('RoleID');
    }
    const obj = {
      "ROLE_ID": Codes
    }
    this.api.POST('Login/GetRoleBasedPrivileges', obj).subscribe(x => {
      if (x.status == 200) {
        console.log( x.response.recordset);
        
        this.SideMenuData = x.response.recordset;
        this.SideMenuData.map(item => {
          const index = this.ParentModules.findIndex(x => x.M_NAME === item.M_NAME);
          if (index === -1) {
            this.ParentModules.push({
              'M_ID': (item.M_NAME).replace(/[^A-Z0-9]+/ig, ""),
              'M_NAME': item.M_NAME,
              'M_SEQ': item.M_SEQ,
              'M_IMAGE': item.M_IMAGE,
              'SUB_MODULE': [item]
            });
          }
          else {
            this.ParentModules[index].SUB_MODULE.push(item);
          }
        });
      }
    });
  }

  SideTabClick(event) {
    let myOffCanvas = document.getElementById('offcanvas');
    myOffCanvas.style.visibility='hidden';
    // let openedCanvas = bootstrap.Offcanvas.getInstance(myOffCanvas);
    // openedCanvas.hide();
    this.ActiveMenu = event;
    if (this.validURL(event)) {
      window.open(event, '_blank');
    }
    else
      this.router.navigate([event]);
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
  closeMenu()
  {
    
      $("#close").trigger('click')
    
  }
  closenav(e) {
    if (e.target.className !== 'navbar-toggler-icon') {
      $("#close").trigger('click')

    }
    if (e.target.className == 'navbar-toggler-icon') {
      let myOffCanvas = document.getElementById('offcanvas');
      myOffCanvas.style.visibility='visible';
     
    }
  }

}

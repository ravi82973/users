import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  panel: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    if (this.panel == false) {
      document.getElementById("mySidebar").style.width = "263px";
      document.getElementById("main").style.marginLeft = "0px";
      this.panel = true
    }
    else {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      this.panel = false
    }
  }

}

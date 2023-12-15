import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../../Core/_providers/message.service';
declare var alertify: any;
alertify.set('notifier', 'position', 'top-left');

@Component({
  selector: 'app-sent-msg',
  templateUrl: './sent-msg.component.html',
  styleUrls: ['./sent-msg.component.scss'],
})
export class SentMsgComponent implements OnInit {
  @ViewChild('actionClose') actionClose: any;
  @ViewChild('closeForm') closeForm: any;
  messagebody: any = '';
  msgErr: boolean = false;
  enternumber: any = '';
  phonenumber: any = '';
  failednumber: any = '';
  numErr: boolean = false;
  stores: any = [];
  store: any = '';
  storeError: boolean = false;
  txtShow: boolean = false;
  correctNums: any = [];
  failedNums: any = [];
  spaceRemoveArr: any = [];
  theNumIs: any = '';
  templateBtn: boolean = false;
  clkErr: boolean = false;
  TemplatesData: any = [];
  numCount: any = '';
  ErrValue = 1;
  storeId: any = '';
  tempId: any = '';
  refVar: any;
  selectedStoreId: any = '';
  // TempRef : any = 0;
  isShowDiv = true;
  isAddDiv = false;
  constructor(private msgServce: MessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.store = 0;
    this.getStores();
    this.refVar = '';
  }

  OnChange(event: any) {
    console.log(event);
  }

  templateForm = this.fb.group({
    tempName: [''],
    tempDesc: [''],
    tempStatus: [''],
  });

  saveTemplate() {
    if (
      this.templateForm.value.tempName == '' ||
      this.templateForm.value.tempDesc == '' ||
      this.templateForm.value.tempStatus == ''
    ) {
      alert('All Fields Required.');
    } else {
      let Obj: any;
      if (this.refVar == 'add') {
        Obj = {
          id: '',
          twname: this.templateForm.value.tempName,
          twdesc: this.templateForm.value.tempDesc,
          twstatus: this.templateForm.value.tempStatus,
          twstoreid: this.selectedStoreId,
        };
      }

      if (this.refVar == 'edit') {
        Obj = {
          id: this.tempId,
          twname: this.templateForm.value.tempName,
          twdesc: this.templateForm.value.tempDesc,
          twstatus: this.templateForm.value.tempStatus,
          twstoreid: this.storeId,
        };
      }
      console.log(Obj);
      this.msgServce.saveTemplate(Obj).subscribe((data) => {
        console.log(data);
        this.closeForm.nativeElement.click();
        this.tempClick();
      });
    }
  }

  cancelform() {
    this.isAddDiv = false;
    this.isShowDiv = true;
    this.refVar = '';
    this.templateForm.reset();
  }

  addTemp() {
    this.isAddDiv = true;
    this.isShowDiv = false;
    this.refVar = 'add';
  }

  EditTemplate(data: any) {
    this.refVar = 'edit';
    this.isAddDiv = true;
    this.isShowDiv = false;
    console.log(data);
    this.templateForm.patchValue({
      tempName: data.TW_NAME,
      tempDesc: data.TW_DESCRIPTION,
      tempStatus: data.TW_STATUS,
    });
    this.storeId = data.TW_STOREID;
    this.tempId = data.TW_ID;
  }

  getStores() {
    let obj = {
      ID: 0,
    };
    this.msgServce.getStores(obj).subscribe((data) => {
      console.log(data);
      this.stores = data;
    });
  }

  selectDropdown() {
    // console.log(event);
    console.log(this.store);
    this.templateBtn = true;
  }

  proceedClk() {
    this.clearArray();
    console.log(this.enternumber);
    // const enterNum = this.enternumber;
    if (this.enternumber == '' && this.phonenumber == '') {
      this.numErr = true;
      this.clkErr = false;
      this.txtShow = false;
    } else {
      this.txtShow = true;
      this.clkErr = false;
      this.numErr = false;
      console.log(this.enternumber);
      const enternumber1 = this.enternumber.replace(/[\r\n]/gm, ' ');
      console.log('one : ', enternumber1);
      const enternumber2 = enternumber1.replace(/^\+1/, '');
      const enternumber3 = enternumber2.replace(/\D/g, ' ');
      console.log('Check Values : ', enternumber2);
      const spaceArr = enternumber3.split(' ');
      console.log(spaceArr);
      for (let i = 0; i < spaceArr.length; i++) {
        const removespl = spaceArr[i].replace(/[^\w\n\s]/gi, '');
        // console.log(removespl);
        if (removespl != '') {
          this.spaceRemoveArr.push(removespl);
        }
      }
      console.log('space : ', this.spaceRemoveArr);
      for (let j = 0; j < this.spaceRemoveArr.length; j++) {
        const arrValue = this.spaceRemoveArr[j].replace('_', '');
        console.log('the value : ' + arrValue);
        if (arrValue.length < 10) {
          console.log('Num is : ' + this.theNumIs);
          console.log('if : ', this.theNumIs);
          if (this.theNumIs == '') {
            this.theNumIs = arrValue;
          } else {
            const sumNum = 10 - this.theNumIs.length;
            // alert(sumNum);
            if (sumNum > arrValue.length) {
              this.theNumIs = this.theNumIs + arrValue;
            } else {
              if (sumNum == arrValue.length) {
                this.theNumIs = this.theNumIs + arrValue;
                const correctarrCheck = this.correctNums.includes(
                  this.theNumIs
                );
                // alert(correctarrCheck);
                if (correctarrCheck == false) {
                  this.correctNums.push(this.theNumIs);
                }
                this.theNumIs = '';
              } else {
                // alert();
                this.failedNums.push(this.theNumIs);
                this.theNumIs = '';
                this.theNumIs = arrValue;
              }
            }
          }
          // console.log('if Length : ', this.theNumIs.length);
        } else {
          if (arrValue.length == 10) {
            const correctarrCheck = this.correctNums.includes(arrValue);
            // alert(correctarrCheck);
            if (correctarrCheck == false) {
              this.correctNums.push(arrValue);
            }
            if (this.theNumIs != '') {
              this.failedNums.push(this.theNumIs);
            }
            this.theNumIs = '';
          } else {
            if (this.theNumIs != '') {
              this.failedNums.push(this.theNumIs);
            }
            this.failedNums.push(arrValue);
            this.theNumIs = '';
          }
        }
      }
      if (this.theNumIs.length != 10) {
        this.failedNums.push(this.theNumIs);
      }
      console.log('Correct Nums : ', this.correctNums);
      console.log('Failed Nums : ', this.failedNums);
      this.numCount = this.correctNums.length;
      this.phonenumber = this.correctNums.join(',\n');
      this.failednumber = this.failedNums.join(' ');
      this.enternumber = '';
      this.enternumber = this.failednumber;
      console.log(this.phonenumber);
      console.log(this.failednumber);
    }
    if (this.phonenumber == '') {
      alert('Check Your Phone Numbers Once.');
      this.clkErr = true;
    }
  }

  clearArray() {
    this.spaceRemoveArr = [];
    // this.correctNums = [];
    this.failedNums = [];
    this.theNumIs = '';
  }

  tempClick() {
    console.log(this.stores);
    console.log(this.store);
    let storeId: any = '';
    for (let i = 0; i < this.stores.response.length; i++) {
      if (this.store == this.stores.response[i].TWILIO_NUMBER) {
        this.selectedStoreId = this.stores.response[i].STORE_ID;
        storeId = 'TW_STOREID IN (' + this.stores.response[i].STORE_ID + ')';
        break;
      }
    }
    console.log('StoreId : ', storeId);
    let Obj = {
      expression: storeId,
      sortby: 'TW_ID ASC',
      rowno: 1,
    };
    this.msgServce.getTemplateData(Obj).subscribe((data) => {
      console.log(data);
      this.TemplatesData = data;
    });
  }

  msgSent() {
    if (this.store == 0 || this.phonenumber == '' || this.messagebody == '') {
      if (this.store == 0) {
        this.storeError = true;
      }
      if (this.phonenumber == '') {
        if (this.enternumber == '') {
          this.numErr = true;
          this.clkErr = false;
        } else {
          this.clkErr = true;
        }
      }
      if (this.messagebody == '') {
        this.msgErr = true;
      }
    } else {
      // alert("else");
      let numbarray = this.phonenumber.split(',');
      let abc = numbarray.map((word: any) =>
        word
          .replace(/[^0-9 ]/g, '')
          .split(' ')
          .join('')
      );
      console.log(abc);
      const index = abc.findIndex((a: any) => a.length != 10);
      if (index === -1) {
        let obj = {
          To_Numbers: this.phonenumber.replace(/[\r\n]/gm, ''),
          Message: this.messagebody,
          From: this.store,
        };
        console.log(obj);
        this.msgServce.MessageSend(obj).subscribe((data) => {
          console.log(data);
          if (data == 'Done') {
            alertify.success('Message Sent Successfully.');
            this.correctNums = [];
            this.phonenumber = '';
            this.enternumber = '';
            this.messagebody = '';
            this.numErr = false;
            this.msgErr = false;
            this.clkErr = false;
            // this.txtShow = false;
            this.store = 0;
          }
        });
      } else {
        alert('please check your numbers');
      }
    }
  }

  keyPressAlpha(event: any) {
    console.log(event);
    var inp = String.fromCharCode(event.keyCode);
    if (/[-(),0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  getName(x: any) {
    this.actionClose.nativeElement.click();
    this.messagebody = x;
    //alert(x);
  }
  ClearForm() {
    this.store = '';
    this.messagebody = '';
    this.enternumber = '';
    this.templateBtn = false;
    this.phonenumber = '';
    this.numCount = '';
    this.clearArray();
    this.correctNums = [];
    this.storeError = false;
    this.msgErr = false;
  }
}

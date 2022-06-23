import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { SignService } from 'src/services/sign.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  cols: any[];
  signList: any;
  sign: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedSign: any;
  selecteForEditorDel: Boolean = false;
  allSigns: any;
  allValues: any;

  @ViewChild('SignTable') SignTable: Table | undefined;

  constructor(private signService: SignService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'Sign', header: 'Sign' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_Sign();
    this.allSigns = this.generalService.get_All_Signs();
    this.allValues = this.generalService.get_All_Values();
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedSign.id;
    this.sign = this.selectedSign.Sign;
    this.type = this.selectedSign.type;
    this.value = this.selectedSign.value;
    this.selecteForEditorDel = true;
  }


  cancel_Sign() {
    this.selectedSign = null;
    this.sign = '';
    this.type = '';
    this.value = '';
    this.selecteForEditorDel = false;
  }

  get_All_Signs() {

  }

  read_All_Sign() {
    this.signService.read_All_Signs().subscribe(data => {
      this.signList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Sign: e.payload.doc.data()['Sign'],
          type: e.payload.doc.data()['type'],
          value: e.payload.doc.data()['value'],
        };
      })
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.idToEditorDelete);
        this.Delete_Sign();
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        this.cancel_Sign();
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  create_Sign() {
    let record = {};
    record['Sign'] = this.sign;
    record['type'] = this.type;
    var valuesArray = this.csvalues.split(',');
    for (var i = 0; i < valuesArray.length; i++) {
      record['value'] = valuesArray[i];
      this.signService.create_Sign(record).then(resp => {
        console.log('success');
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
    }
    this.messageService.add({ severity: 'success', closable: false, summary: 'Sign added', detail: "Sign added to database" });
    this.cancel_Sign();
  }

  Update_Sign() {
    let record = {};
    record['Sign'] = this.sign;
    record['type'] = this.type;
    record['value'] = this.value;
    this.signService.update_Sign(this.idToEditorDelete, record);

    this.messageService.add({ severity: 'success', closable: false, summary: 'Sign updated', detail: this.selectedSign.id + " is updated" });
    this.cancel_Sign();
  }

  Delete_Sign() {
    this.signService.delete_Sign(this.idToEditorDelete);
    
    this.messageService.add({ severity: 'success', closable: false, summary: 'Sign deleted', detail: this.selectedSign.id + " is deleted" });
    this.cancel_Sign();
  }

}

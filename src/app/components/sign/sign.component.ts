import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { SignService } from 'src/services/sign.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  providers:[MessageService]
})
export class SignComponent implements OnInit {

  cols: any[];
  signTypeData: any[]=[];
  signList: any;
  sign: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedSign: any;
  selecteForEditorDel: Boolean = false;
  allSigns: any[]=[];
  allValues: any[]=[];
  filteredValues: any;

  @ViewChild('SignTable') SignTable: Table | undefined;

  constructor(private signService: SignService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'sign', header: 'Sign' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_Sign();
    this.get_Sign_Type_Values();
  }

  get_Sign_Type_Values(){
    this.generalService.getSignTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.signTypeData.push(e);
      });
    });
    setTimeout(() => this.update_Sign_Type_Values(), 3000);
  }

  update_Sign_Type_Values(){
    var signArray = this.signTypeData[0].split(',');
    var typeArray = this.signTypeData[1].split(',');
    signArray.forEach(sign=> this.allSigns.push({ name: sign, value: sign }));
    typeArray.forEach(type=> {
      if(type && type != '')
      this.allValues.push({ name: type, value: type })});;
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
    this.csvalues = '';
    this.selecteForEditorDel = false;
  }

  filterValue(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.allValues.length; i++) {
      let value = this.allValues[i];
      if (value.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(value);
      }
    }
    this.filteredValues = filtered;
  }

  get_All_Signs() {

  }

  read_All_Sign() {
    this.signService.read_All_Signs().subscribe(data => {
      this.signList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          sign: e.payload.doc.data()['sign'],
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
    if(this.type['value']){
      record['type'] = this.type['value'];
    } else{
      record['type'] = this.type
    }
    
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
    if(this.type['value']){
      record['type'] = this.type['value'];
    } else{
      record['type'] = this.type
    }
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

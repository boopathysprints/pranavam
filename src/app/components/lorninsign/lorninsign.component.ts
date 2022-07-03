import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { GeneralService } from 'src/services/general.service';
import { LordinsignService } from 'src/services/lordinsign.service';

@Component({
  selector: 'app-lorninsign',
  templateUrl: './lorninsign.component.html',
  styleUrls: ['./lorninsign.component.css']
})
export class LorninsignComponent implements OnInit {
  cols: any[];

  op1Data: any[]=[];
  op2Data : any[]=[];
  
  allOp1s: any[]=[];
  allOp2s: any[]=[];
  option1Selected: string;
  option2Selected: string;
  value: string;
  csvalues: string;
  tableData: any;
  idToEditorDelete: string;
  selectedItem: any;
  selecteForEditorDel: Boolean = false;

  constructor(private generalService: GeneralService, private dbService: LordinsignService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      {field: 'lord', header: 'Lord' },
      { field: 'sign', header: 'Sign' },
      { field: 'value', header: 'Value' }      
  ];
    this.read_All_Items();
    this.get_Option1_Values();
    this.get_Option2_Values();
  }

  get_Option1_Values(){
    this.generalService.getHouseTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.op1Data.push(e);
      });
    });
    setTimeout(() => this.update_Option1_Values(), 3000);
  }

  update_Option1_Values(){
    var valuesArray = this.op1Data[0].split(',');
    valuesArray.forEach(element=> this.allOp1s.push({ name: element, value: element }));
  }

  get_Option2_Values(){
    this.generalService.getSignTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.op2Data.push(e);
      });
    });
    setTimeout(() => this.update_Option2_Values(), 3000);
  }

  update_Option2_Values(){
    var valuesArray = this.op2Data[0].split(',');
    valuesArray.forEach(element=> this.allOp2s.push({ name: element, value: element }));
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedItem.id;
    this.option1Selected = this.selectedItem.lord;
    this.option2Selected = this.selectedItem.sign;
    this.value = this.selectedItem.value;
    this.selecteForEditorDel = true;
  }


  cancel_Item(){
    this.selectedItem = null;
    this.option1Selected = '';
    this.option2Selected = '';
    this.value = '';
    this.selecteForEditorDel = false;
  }

  read_All_Items() {
    this.dbService.read_All_Items().subscribe(data => {
      this.tableData = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          lord: e.payload.doc.data()['lord'],
          sign: e.payload.doc.data()['sign'],
          value: e.payload.doc.data()['value'],
        };
      })
    });
  }

  create_Item() {
    let record = {};
    record['lord'] = this.option1Selected;
    record['sign'] = this.option2Selected;
    var valuesArray = this.csvalues.split(',');
    for (var i = 0; i < valuesArray.length; i++) {
      record['value'] = valuesArray[i];
      this.dbService.create_Item(record).then(resp => {
        console.log('success');
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
    }
    this.messageService.add({ severity: 'success', closable: false, summary: 'Item added', detail: "Item added to database" });
    this.cancel_Item();
  }

  update_Item() {
    let record = {};
    record['lord'] = this.option1Selected;
    record['sign'] = this.option2Selected;
    record['value'] = this.value;
    this.dbService.update_Item(this.idToEditorDelete, record);
   
    this.messageService.add({severity:'success', closable:false, summary:'Item updated', detail: this.selectedItem.id + " is updated"});
    this. cancel_Item();
  }

  delete_Item() {
    this.dbService.delete_Item(this.idToEditorDelete);
    this.messageService.add({severity:'success', closable:false, summary:'Item deleted', detail: this.selectedItem.id + " is deleted"});
    this. cancel_Item();
  }

}

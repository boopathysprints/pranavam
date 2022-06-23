import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { HouseService } from 'src/services/house.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  cols: any[];
  houseList: any;
  house: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedHouse: any;
  selecteForEditorDel: Boolean = false;
  allHouses: any;
  allValues: any;

  @ViewChild('HouseTable') HouseTable: Table | undefined;

  constructor(private houseService: HouseService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'house', header: 'house' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_House();
    this.allHouses = this.generalService.get_All_Houses();
    this.allValues = this.generalService.get_All_Values();
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedHouse.id;
    this.house = this.selectedHouse.House;
    this.type = this.selectedHouse.type;
    this.value = this.selectedHouse.value;
    this.selecteForEditorDel = true;
  }


  cancel_House() {
    this.selectedHouse = null;
    this.house = '';
    this.type = '';
    this.value = '';
    this.selecteForEditorDel = false;
  }

  get_All_Houses() {

  }

  read_All_House() {
    this.houseService.read_All_Houses().subscribe(data => {
      this.houseList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          House: e.payload.doc.data()['house'],
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
        this.Delete_House();
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        this.cancel_House();
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  create_House() {
    let record = {};
    record['house'] = this.house;
    record['type'] = this.type;
    var valuesArray = this.csvalues.split(',');
    for (var i = 0; i < valuesArray.length; i++) {
      record['value'] = valuesArray[i];
      this.houseService.create_House(record).then(resp => {
        console.log('success');
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
    }
    this.messageService.add({ severity: 'success', closable: false, summary: 'House added', detail: "House added to database" });
    this.cancel_House();
  }

  Update_House() {
    let record = {};
    record['house'] = this.house;
    record['type'] = this.type;
    record['value'] = this.value;
    this.houseService.update_House(this.idToEditorDelete, record);

    this.messageService.add({ severity: 'success', closable: false, summary: 'House updated', detail: this.selectedHouse.id + " is updated" });
    this.cancel_House();
  }

  Delete_House() {
    this.houseService.delete_House(this.idToEditorDelete);
    
    this.messageService.add({ severity: 'success', closable: false, summary: 'House deleted', detail: this.selectedHouse.id + " is deleted" });
    this.cancel_House();
  }

}

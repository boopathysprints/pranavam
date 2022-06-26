import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class HouseComponent implements OnInit {

  cols: any[];
  houseTypeData: any[]=[];
  allHouses: any[]=[];
  allValues: any[]=[];
  
  houseList: any;
  house: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedHouse: any;
  selecteForEditorDel: Boolean = false;
  
  filteredValues: any;

  @ViewChild('HouseTable') HouseTable: Table | undefined;

  constructor(private houseService: HouseService, private confirmationService: ConfirmationService , private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'house', header: 'house' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_House();
    this.get_House_Type_Values();
  }

  get_House_Type_Values(){
    this.generalService.getHouseTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.houseTypeData.push(e);
      });
    });
    setTimeout(() => this.update_House_Type_Values(), 3000);
  }

  update_House_Type_Values(){
    var houseArray = this.houseTypeData[0].split(',');
    var typeArray = this.houseTypeData[1].split(',');
    houseArray.forEach(house=> this.allHouses.push({ name: house, value: house }));
    typeArray.forEach(type=> {
      if(type && type != '')
      this.allValues.push({ name: type, value: type })});;
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

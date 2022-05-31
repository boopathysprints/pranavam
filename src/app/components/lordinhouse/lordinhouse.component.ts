import { Component, OnInit } from '@angular/core';
import { LordInHouseService } from 'src/services/lordinhouse.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-lordinhouse',
  templateUrl: './lordinhouse.component.html',
  styleUrls: ['./lordinhouse.component.css'],
  providers: [MessageService]
})
export class LordinhouseComponent implements OnInit {
  lordInHouseList: any;
  house: string;
  lord: string;
  trait: string;
  idToEditorDelete: string;

  selectedLordInHouse: any;
  selecteForEditorDel: Boolean = false;

  constructor(private lordInHouseService: LordInHouseService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.read_All_LordInHouse();
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedLordInHouse.id;
    this.house = this.selectedLordInHouse.house;
    this.lord = this.selectedLordInHouse.lord;
    this.trait = this.selectedLordInHouse.trait;
    this.selecteForEditorDel = true;
  }

  cancel_LordInHouse(){
    this.selectedLordInHouse = null;
    this.house = '';
    this.lord = '';
    this.trait = '';
    this.selecteForEditorDel = false;
  }

  read_All_LordInHouse() {
    this.lordInHouseService.read_All_LordInHouse().subscribe(data => {
      this.lordInHouseList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          house: e.payload.doc.data()['house'],
          lord: e.payload.doc.data()['lord'],
          trait: e.payload.doc.data()['trait'],
        };
      })
    });
  }

  create_LordInHouse() {
    let record = {};
    record['house'] = this.house;
    record['lord'] = this.lord;
    record['trait'] = this.trait;
    this.lordInHouseService.create_LordInHouse(record).then(resp => {
      this.messageService.add({severity:'success', closable:false, summary:'Lord-in-house added', detail: "Lord-in-house added to database"});
      this.cancel_LordInHouse();
    })
      .catch(error => {
        this.messageService.add({severity:'error', closable:false, summary:'some error occured', detail: error});
      });
  }

  Update_LordInHouse() {
    let record = {};
    record['house'] = this.house;
    record['lord'] = this.lord;
    record['trait'] = this.trait;
    this.lordInHouseService.update_LordInHouse(this.idToEditorDelete, record);
   
    this.messageService.add({severity:'success', closable:false, summary:'Lord-in-house updated', detail: this.selectedLordInHouse.id + " is updated"});
    this. cancel_LordInHouse();
  }

  Delete_LordInHouse() {
    this.lordInHouseService.delete_LordInHouse(this.idToEditorDelete);
    this.messageService.add({severity:'success', closable:false, summary:'Lord-in-house deleted', detail: this.selectedLordInHouse.id + " is deleted"});
    this. cancel_LordInHouse();
  }

}

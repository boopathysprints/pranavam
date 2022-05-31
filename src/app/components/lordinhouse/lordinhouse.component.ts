import { Component, OnInit } from '@angular/core';
import { LordInHouseService } from 'src/services/lordinhouse.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-lordinhouse',
  templateUrl: './lordinhouse.component.html',
  styleUrls: ['./lordinhouse.component.css']
})
export class LordinhouseComponent implements OnInit {
  lordInHouseList : any;
  house : string;
  lord : string;
  trait : string;
  idToEdit : string;
  idToDelete : string;

  selectedLordInHouse: any;

  constructor(public lordInHouseService:LordInHouseService) { }

  ngOnInit(): void {
    //this.idToDelete = 'r1oEl4bYFYehaUJoRUWZ';
    // this.house = '1';
    // this.lord = '1';
    // this.trait = 'Independent -தன்னிச்சையான';
    this.read_All_LordInHouse(); 
  }

  onRowSelect(event) {
   console.log(this.selectedLordInHouse);
}

  read_All_LordInHouse(){
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
      this.house = "";
      this.lord = "";
      this.trait = "";
      //console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  Edit_LordInHouse(record){
    record.isEdit = true;
    record.EditHouse = record.house;
    record.EditLord = record.lord;
    record.EditTrait = record.trait;
  }

  Update_LordInHouse() {
    let record = {};
    record['house'] = this.house;
    record['lord'] = this.lord;
    record['trait'] = this.trait;
    this.lordInHouseService.update_LordInHouse(this.idToEdit, record);
  }

  Delete_LordInHouse() {
    this.lordInHouseService.delete_LordInHouse(this.idToDelete);
  }

}

import { Component, OnInit } from '@angular/core';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { LordInHouse } from 'src/interfaces/lordinhouse.interface';

import { LordInHouseService } from 'src/services/lordinhouse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lordInHouseList : any;
  house : string;
  lord : string;
  trait : string;
  idToEdit : string;
  idToDelete : string;
  constructor(public lordInHouseService:LordInHouseService) {}
  
  ngOnInit(): void {
    this.idToDelete = 'r1oEl4bYFYehaUJoRUWZ';
    // this.house = '1';
    // this.lord = '1';
    // this.trait = 'Independent -தன்னிச்சையான';
    this.read_All_LordInHouse(); 
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
      console.log(this.lordInHouseList);
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

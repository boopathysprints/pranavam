import { Component, OnInit } from '@angular/core';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { LordInHouse } from 'src/interfaces/lordinhouse.interface';
import { FireStoreService } from 'src/services/firestore.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lordInHouseList : any[];
  constructor(public firestoreService:FireStoreService) {}
  
  ngOnInit(): void {

    this.get();
    
  }

  async get() {
    const snapshot = await this.firestoreService.getLords();
    this.updateLordCollection(snapshot);
  }

  updateLordCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.lordInHouseList = [];
    snapshot.docs.forEach((lordinhouse) => {
      this.lordInHouseList.push({ ...lordinhouse.data() });
    })
  }

}

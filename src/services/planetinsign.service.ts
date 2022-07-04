import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetinsignService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('planetinsign').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('planetinsign').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('planetinsign/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('planetinsign/' + record_id).delete();
  }
}

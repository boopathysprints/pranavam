import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetinstarService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('planetinstar').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('planetinstar').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('planetinstar/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('planetinstar/' + record_id).delete();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetaslordService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('planetaslord').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('planetaslord').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('planetaslord/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('planetaslord/' + record_id).delete();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignashouseService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('signashouse').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('signashouse').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('signashouse/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('signashouse/' + record_id).delete();
  }
}

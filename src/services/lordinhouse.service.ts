import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LordinhouseService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('lordinhouse').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('lordinhouse').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('lordinhouse/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('lordinhouse/' + record_id).delete();
  }
}

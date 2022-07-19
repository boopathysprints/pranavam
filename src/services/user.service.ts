import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  read_Items_Where(lord, house) {
    return this.firestore.collection('lordinhouse', ref => ref.where('lord', '==', lord).where('house', '==', house)).snapshotChanges();
  }

  read_All_Items() {
    return this.firestore.collection('lordinhouse').snapshotChanges();
  }

  create_Item(record) {
    return this.firestore.collection('user').add(record);
  }

  update_Item(recordID, record) {
    this.firestore.doc('lordinhouse/' + recordID).update(record);
  }

  delete_Item(record_id) {
    this.firestore.doc('lordinhouse/' + record_id).delete();
  }
}

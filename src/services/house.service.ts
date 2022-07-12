import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private firestore: AngularFirestore) { }

  read_Items_Where(house) {
    return this.firestore.collection('houses', ref => ref.where('house', '==', house)).snapshotChanges();
  }

  read_All_Houses() {
    return this.firestore.collection('houses').snapshotChanges();
  }

  create_House(record) {
    return this.firestore.collection('houses').add(record);
  }

  update_House(recordID, record) {
    this.firestore.doc('houses/' + recordID).update(record);
  }

  delete_House(record_id) {
    this.firestore.doc('houses/' + record_id).delete();
  }
}

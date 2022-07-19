import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetinhouseService {

  constructor(private firestore: AngularFirestore) { }

  

  read_Items_Where(planet, house) {
    return this.firestore.collection('planetinhouse', ref => ref.where('planet', '==', planet).where('house', '==', house)).snapshotChanges();
  }

  read_All_Items() {
    return this.firestore.collection('planetinhouse').snapshotChanges();
  }

  create_Item(record) {
    return this.firestore.collection('planetinhouse').add(record);
  }

  update_Item(recordID, record) {
    this.firestore.doc('planetinhouse/' + recordID).update(record);
  }

  delete_Item(record_id) {
    this.firestore.doc('planetinhouse/' + record_id).delete();
  }
}

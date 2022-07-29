import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private firestore: AngularFirestore) { }

  read_Items_Where(planet) {
    return this.firestore.collection('planetss', ref => ref.where('planet', '==', planet)).snapshotChanges();
  }

  read_All_Planets() {
      return this.firestore.collection('planetss').snapshotChanges();
  }

  create_Planet(record) {
      return this.firestore.collection('planetss').add(record);
  }

  update_Planet(recordID,record){
      this.firestore.doc('planetss/' + recordID).update(record);
  }
  
  delete_Planet(record_id) {
      this.firestore.doc('planetss/' + record_id).delete();
  }
}

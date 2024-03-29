import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlanetinstarService {

  constructor(private firestore: AngularFirestore) { }

  Read_For_Natchathiram(star) {
    return this.firestore.collection('planetinstar', ref => ref.where('planet', '==', 'சந்திரன்').where('star', '==', star)).snapshotChanges();
  }

  Read_For_Placement(planet,star) {
    return this.firestore.collection('planetinstar', ref => ref.where('planet', '==', planet).where('star', '==', star)).snapshotChanges();
  }

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

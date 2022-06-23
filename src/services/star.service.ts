import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Stars() {
      return this.firestore.collection('stars').snapshotChanges();
  }

  create_Star(record) {
      return this.firestore.collection('stars').add(record);
  }

  update_Star(recordID,record){
      this.firestore.doc('stars/' + recordID).update(record);
  }
  
  delete_Star(record_id) {
      this.firestore.doc('stars/' + record_id).delete();
  }
}

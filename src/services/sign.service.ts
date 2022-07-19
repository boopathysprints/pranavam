import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private firestore: AngularFirestore) { }

  read_Items_Where(sign) {
    return this.firestore.collection('signs', ref => ref.where('sign', '==', sign)).snapshotChanges();
}

  read_All_Signs() {
      return this.firestore.collection('signs').snapshotChanges();
  }

  create_Sign(record) {
      return this.firestore.collection('signs').add(record);
  }

  update_Sign(recordID,record){
      this.firestore.doc('signs/' + recordID).update(record);
  }
  
  delete_Sign(record_id) {
      this.firestore.doc('signs/' + record_id).delete();
  }
}

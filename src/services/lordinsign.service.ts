import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LordinsignService {

  constructor(private firestore: AngularFirestore) { }

  read_All_Items() {
      return this.firestore.collection('lordinsigns').snapshotChanges();
  }

  create_Item(record) {
      return this.firestore.collection('lordinsigns').add(record);
  }

  update_Item(recordID,record){
      this.firestore.doc('lordinsigns/' + recordID).update(record);
  }
  
  delete_Item(record_id) {
      this.firestore.doc('lordinsign/' + record_id).delete();
  }
}

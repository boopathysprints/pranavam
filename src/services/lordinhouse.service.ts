import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
})
export class LordInHouseService {
    constructor(private firestore: AngularFirestore) { }

    read_All_LordInHouse() {
        return this.firestore.collection('lordinhouse').snapshotChanges();
    }

    create_LordInHouse(record) {
        return this.firestore.collection('lordinhouse').add(record);
    }

    update_LordInHouse(recordID,record){
        this.firestore.doc('lordinhouse/' + recordID).update(record);
    }
    
    delete_LordInHouse(record_id) {
        this.firestore.doc('lordinhouse/' + record_id).delete();
    }
}
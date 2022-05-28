import { Injectable } from '@angular/core';
import { LordInHouse } from '../interfaces/lordinhouse.interface';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
    db: Firestore;
    lordCol: CollectionReference<DocumentData>;


    lordinhouseCollection: Observable<any[]>;
  lordinhouseCollectionRef: AngularFireList<any>;
  lordinhouseRef: AngularFireObject<any>;
  
  constructor() {
    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
    this.lordCol = collection(this.db, 'lordinhouse');
  }

  async getLords() {
    const snapshot = await getDocs(this.lordCol);
    console.log(snapshot);
    return snapshot;
  }
  
  // Create LordInHouse
  AddLordInHouse(lordinhouse: LordInHouse) {
    this.lordinhouseCollectionRef.push({
        house: lordinhouse.house,
        lord: lordinhouse.lord,
        trait: lordinhouse.trait
    });
  }
  // Fetch Single LordInHouse Object
  GetLordInHouse(id: string) {
    //this.lordinhouseRef = this.db.object('lordinhouse/' + 'x9x1ra4ZqDGI9u7PIWTO');
    
    return this.lordinhouseRef;
  }
  // Fetch LordInHouse List
  GetLordInHouseList() : Observable<LordInHouse[]> {
      //const lordref = collection(this.firestore, 'books');
    //this.lordinhouseCollection = this.db.list('lordinhouse').snapshotChanges();
    return this.lordinhouseCollection;
   // return this.lordinhouseCollectionRef;
  }
  // Update LordInHouse Object
  UpdateLordInHouse(lordinhouse: LordInHouse) {
    this.lordinhouseRef.update({
        house: lordinhouse.house,
        lord: lordinhouse.lord,
        trait: lordinhouse.trait
    });
  }
  // Delete LordInHouse Object
  DeleteLordInHouse(id: string) {
    //this.lordinhouseRef = this.db.object('lordinhouse/' + id);
    this.lordinhouseRef.remove();
  }
}

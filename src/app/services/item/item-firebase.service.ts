import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemFirebaseService {

  firestore = inject(Firestore);
  itemsCollection = collection(this.firestore, 'items');

  getItems() {
    return collectionData(this.itemsCollection, {
      idField: 'id'
    }) // as Observable<interface>
  }

  addItem(newItem: any){
    const promise = addDoc(this.itemsCollection, newItem).then(
      (response:any) => response // message service notification here?
    );
    return from(promise);
  }

}

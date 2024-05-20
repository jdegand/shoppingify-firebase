import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Item } from '../../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemFirebaseService {

  firestore = inject(Firestore);
  itemsCollection = collection(this.firestore, 'items');

  getItems() {
    return collectionData(this.itemsCollection, {
      idField: 'id'
    }) as Observable<Item[]>;
  }

  addItem(newItem: Item) {
    const promise = addDoc(this.itemsCollection, newItem).then(
      (response: DocumentReference) => response 
    );
    return from(promise);
  }

  getItemById(id: string) {
    const docRef = doc(this.firestore, 'items/' + id);
    const promise = getDoc(docRef);
    return from(promise);
  }

}

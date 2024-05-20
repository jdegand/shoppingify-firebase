import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { List } from '../../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListFirebaseService {

  firestore = inject(Firestore);
  listsCollection = collection(this.firestore, 'lists');

  getLists() {
    return collectionData(this.listsCollection, {
      idField: 'id'
    }) as Observable<List[]>;
  }

  addList(newItem: List) { 
    const promise = addDoc(this.listsCollection, newItem).then(
      (response: DocumentReference) => response 
    );
    return from(promise);
  }

  getListById(id: string) {
    const docRef = doc(this.firestore, 'lists/' + id);
    const promise = getDoc(docRef);
    return from(promise);
  }

}

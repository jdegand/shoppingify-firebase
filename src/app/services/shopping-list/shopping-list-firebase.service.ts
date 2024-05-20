import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response: any) => {console.log('addList response', response); return response} 
    );
    return from(promise);
  }

  getListById(id: string) {
    const docRef = doc(this.firestore, 'lists/' + id);
    const promise = getDoc(docRef);
    return from(promise);
  }

}

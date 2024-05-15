import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListFirebaseService {

  firestore = inject(Firestore);
  listsCollection = collection(this.firestore, 'lists');

  getLists() {
    return collectionData(this.listsCollection, {
      idField: 'id'
    }) // as Observable<interface>
  }

  addList(newItem: any){
    const promise = addDoc(this.listsCollection, newItem).then(
      (response:any) => response
    );
    return from(promise);
  }

}

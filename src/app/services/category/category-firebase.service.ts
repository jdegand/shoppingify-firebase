import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryFirebaseService {

  firestore = inject(Firestore);
  categoriesCollection = collection(this.firestore, 'categories');

  getCategories() {
    return collectionData(this.categoriesCollection, {
      idField: 'id'
    }) // as Observable<interface>
  }
}

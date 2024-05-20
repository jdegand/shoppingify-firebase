import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { CategoriesResponse } from '../../interfaces/categories-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryFirebaseService {

  firestore = inject(Firestore);
  categoriesCollection = collection(this.firestore, 'categories');

  getCategories() {
    return collectionData(this.categoriesCollection, {
      idField: 'id'
    }) as Observable<CategoriesResponse[]>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addCategory(category: any) { // object
    const promise = addDoc(this.categoriesCollection, category).then(
      (response: DocumentReference) => { return response; }
    );
    return from(promise);
  }

}

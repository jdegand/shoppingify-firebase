import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from } from 'rxjs';

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

  addCategory(category: any){
    const promise = addDoc(this.categoriesCollection, category).then(
      (response:any) => response // message service notification here?
    );
    return from(promise);
  }

}

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

  /*
  const db = admin.firestore();

  // Function to add a new category to the 'categories' collection
  const addCategory = async (categoryData) => {
    const categoryRef = db.collection('categories').doc();
    await categoryRef.set(categoryData);
    return categoryRef.id;
  };

  // Function to get all categories from the 'categories' collection
const getAllCategories = async () => {
  const snapshot = await db.collection('categories').get();
  const categories = [];
  snapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
};

  */
}

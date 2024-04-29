import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemFirebaseService {

  /* 
  // Function to add a new item to the 'items' collection
const addItem = async (itemData) => {
  const itemRef = db.collection('items').doc();
  await itemRef.set(itemData);
  return itemRef.id;
};



// Function to get all items from the 'items' collection
const getAllItems = async () => {
  const snapshot = await db.collection('items').get();
  const items = [];
  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};
  */
}

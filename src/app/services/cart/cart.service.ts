import { Injectable, signal } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<Item[]>([]);

  addToCart(item: Item): void {
    // Check if the item is already in the cart
    const cartItem = this.cartItems().find(i => i.name === item.name);

    if (cartItem) {
      // Update the quantity
      this.updateInCart(cartItem, cartItem.quantity + 1);
    } else {
      // Add the item to the cart
      // Use update and not mutate because it's replacing the array, not updating an element
      this.cartItems.update((items) => [...items, { ...item, quantity: 1 }]);
    }
  }

  emptyCart() {
    this.cartItems.set([]);
  }

  // Remove the item from the cart
  removeFromCart(cartItem: Item): void {
    // Use update and not mutate because it's replacing the array, not updating an element
    this.cartItems.update((items) =>
      items.filter((i) => i.name !== cartItem.name)
    );
  }

  updateInCart(cartItem: Item, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.name === cartItem.name
          ? { ...cartItem, quantity }
          : item
      )
    );
  }
}

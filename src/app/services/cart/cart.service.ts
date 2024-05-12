import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<any[]>([]);

  addToCart(item: any): void {
    // Check if the item is already in the cart
    const cartItem = this.cartItems().find(i => i.name === item.name);

    console.log('cartItem', cartItem);

    if (cartItem) {
      // Update the quantity
      this.updateInCart(cartItem, cartItem.quantity + 1);
    } else {
      // Add the item to the cart
      // Use update and not mutate because it's replacing the array, not updating an element
      this.cartItems.update((items) => [...items, { ...item, quantity: 1 }]);
      console.log('added',this.cartItems());
    }
  }

  emptyCart(){
    this.cartItems.set([]);
  }

  // Remove the item from the cart
  removeFromCart(cartItem: any): void {
    // Use update and not mutate because it's replacing the array, not updating an element
    this.cartItems.update((items) =>
      items.filter((i) => i.name !== cartItem.name)
    );
  }

  updateInCart(cartItem: any, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.name === cartItem.name
          ? { ...cartItem, quantity }
          : item
      )
    );
  }
}
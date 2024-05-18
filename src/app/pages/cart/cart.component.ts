import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ButtonModule } from 'primeng/button';
import { TitleCasePipe } from '@angular/common';
import { FloatLabelModule } from "primeng/floatlabel"
import { FormsModule } from '@angular/forms';
import { Item } from '../../interfaces/item.interface';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonModule, TitleCasePipe, FormsModule, FloatLabelModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  listName: string | undefined;
  isLoading = false;

  onQuantitySelected(item: Item, qty: number) {
    if (qty === 0) {
      this.cartService.removeFromCart(item);
    }
    this.cartService.updateInCart(item, qty);
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }

  clear() {
    this.cartService.emptyCart();
  }

  saveList() {
    const cartItems = this.cartItems();

    if (this.listName && cartItems.length) {
      this.isLoading = true;
 
      const listObject = {
        name: "",
        items: [] as Item[],
        date: new Date() // need to look more into firebase timestamps
      }

      listObject.name = this.listName;
      listObject.items = cartItems;

      this.shoppingListFirebaseService.addList(listObject).subscribe({
        next: () => {
          this.cartService.emptyCart();
          this.listName = "";
          // message service?
        },
        error: (err) => {
          console.log('error', err)
        },
        complete: () => this.isLoading = false
      })
    } 
  }

}

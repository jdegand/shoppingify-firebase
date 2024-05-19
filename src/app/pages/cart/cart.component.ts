import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ButtonModule } from 'primeng/button';
import { TitleCasePipe } from '@angular/common';
import { FloatLabelModule } from "primeng/floatlabel"
import { FormsModule } from '@angular/forms';
import { Item } from '../../interfaces/item.interface';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonModule, TitleCasePipe, FormsModule, FloatLabelModule, ToastModule],
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  messageService = inject(MessageService);
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  listName: string | undefined;
  isLoading = false;

  onQuantitySelected(item: Item, quantity: number) {
    if (quantity === 0) {
      this.cartService.removeFromCart(item);
    }
    this.cartService.updateInCart(item, quantity);
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.listName + " saved" });
          this.cartService.emptyCart();
          this.listName = "";
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        },
        complete: () => this.isLoading = false
      })
    } 
  }

}

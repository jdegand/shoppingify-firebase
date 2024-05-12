import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ButtonModule } from 'primeng/button';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonModule, TitleCasePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  onQuantitySelected(item: any, qty: number) {
    this.cartService.updateInCart(item, qty);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  clear() {
    this.cartService.emptyCart();
  }

}

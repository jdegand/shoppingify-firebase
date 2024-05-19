import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart/cart.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe, DatePipe, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  id = "";

  item$: Observable<any> | undefined;

  itemFirebaseService = inject(ItemFirebaseService);
  cartService = inject(CartService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.item$ = this.itemFirebaseService.getItemById(this.id);
    });
  }

  addToCart(item: Item) {

    // could look into a better way to convert this
    // using (onClick)="addToCart(item._document.data.value.mapValue.fields)"
    // item id is missing -> id is added with url parameter value
    // could get from item if you just pass item vs fields object in template 

    const fixedItem = {
      categoryId: "",
      categoryName: "",
      name: "",
      note: "",
      quantity: 0,
      url: "",
      id: this.id // param value
    }

    fixedItem.categoryId = JSON.parse(JSON.stringify(item.categoryId)).stringValue;
    fixedItem.categoryName = JSON.parse(JSON.stringify(item.categoryName)).stringValue;
    fixedItem.name = JSON.parse(JSON.stringify(item.name)).stringValue;
    fixedItem.note = JSON.parse(JSON.stringify(item.note)).stringValue;
    fixedItem.quantity = Number(JSON.parse(JSON.stringify(item.quantity)).integerValue);
    fixedItem.url = JSON.parse(JSON.stringify(item.url)).stringValue;

    this.cartService.addToCart(fixedItem);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: fixedItem.name + " added" });
  }

}

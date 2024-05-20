import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { SplitterModule } from 'primeng/splitter';
import { AuthService } from '../../services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CartService } from '../../services/cart/cart.service';
import { Observable, map } from 'rxjs';
import { ToastModule } from "primeng/toast";
import { Item } from '../../interfaces/item.interface';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from '../../pipes/name-filter.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf, JsonPipe, KeyValuePipe, SplitterModule, CardModule, TitleCasePipe, ButtonModule, ScrollPanelModule, ToastModule, TooltipModule, FormsModule, NameFilterPipe, InputTextModule, IconFieldModule, InputIconModule],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  itemFirebaseService = inject(ItemFirebaseService);
  authService = inject(AuthService);
  cartService = inject(CartService);
  messageService = inject(MessageService);
  router = inject(Router);

  searchTerm!: string;

  menuItems: MenuItem[] | undefined;
  groupedItemsMap$: Observable<Map<string, Item[]>> | undefined = undefined;

  ngOnInit() {
    this.groupedItemsMap$ = this.itemFirebaseService.getItems().pipe(
      map((items: Item[]) => {
        const map = new Map<string, Item[]>();

        items.forEach((item: Item) => {
          if (!map.has(item?.categoryName?.toLowerCase())) {
            map.set(item.categoryName, []);
          }
          map.get(item.categoryName)?.push(item);
        });
        
        return map;
      })
    )

    // could nest another items array inside the home object 
    // then you wouldn't have to use `/home` in the routes
    // but the icons need to be on the same level and not hidden
    // need to investigate more
    // badge property -> don't think that works.  If it did, would need to use effect to
    // change groupedItemsMap to a signal.   
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/home']);
        }
      },
      {
        label: 'New Item',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/home/new']);
        }
      },
      {
        label: 'History',
        icon: 'pi pi-history',
        command: () => {
          this.router.navigate(['/home/history']);
        }
      },
      {
        label: 'Stats',
        icon: 'pi pi-chart-line',
        command: () => {
          this.router.navigate(['/home/stats']);
        }
      },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        command: () => {
          this.router.navigate(['/home/cart']);
        }
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/']);
        }
      }
    ];
  }

  addToCart(item: Item) {
    // could use a variable to transform name to titlecase for the message
    this.cartService.addToCart(item);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: item.name + " added" });
    // navigate to the cart route as well ?  Would work fine on desktop, but not good idea for mobile
    // this.router.navigate(['/home/cart']);
  }

}

import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { SplitterModule } from 'primeng/splitter';
import { AuthService } from '../../services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf, JsonPipe, KeyValuePipe, SplitterModule, CardModule, TitleCasePipe, ButtonModule, ScrollPanelModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  itemFirebaseService = inject(ItemFirebaseService);
  authService = inject(AuthService);
  router = inject(Router);

  items: MenuItem[] | undefined;
  groupedItemsMap = new Map<string, any[]>();
  
  ngOnInit() {
    this.itemFirebaseService.getItems().subscribe((items) => {
      console.log('items', items);

      // need to reset the groupedItemsMap after you add an item 
      // previous items will be duplicated if you don't reset the map
      this.groupedItemsMap = new Map<string, any[]>();
      
      items.forEach((item: any) => {
        if (!this.groupedItemsMap.has(item.categoryName)) {
          this.groupedItemsMap.set(item.categoryName, []);
        }
        this.groupedItemsMap.get(item.categoryName)?.push(item);
      });
    });

    // could nest another items array inside the home object 
    // then you wouldn't have to use `/home` in the routes
    // but the icons need to be on the same level and not hidden
    // need to investigate more
    this.items = [
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

  getGroupedItemsArray(): [string, any[]][] {
    return Array.from(this.groupedItemsMap.entries());
  }

}

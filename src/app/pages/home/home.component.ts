import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf, JsonPipe, KeyValuePipe, SplitterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  itemFirebaseService = inject(ItemFirebaseService)
  router = inject(Router);

  items: MenuItem[] | undefined;
  groupedItemsMap = new Map<string, any[]>();
  
  ngOnInit() {
    this.itemFirebaseService.getItems().subscribe((items) => {
      console.log('items', items);
      
      items.forEach((item: any) => {
        if (!this.groupedItemsMap.has(item.categoryName)) {
          this.groupedItemsMap.set(item.categoryName, []);
        }
        this.groupedItemsMap.get(item.categoryName)?.push(item);
      });
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/home']);
        }
      },
      {
        label: 'list',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/list']);
        }
      },
      {
        label: 'History',
        icon: 'pi pi-history',
        command: () => {
          this.router.navigate(['/history']);
        }
      },
      {
        label: 'Stats',
        icon: 'pi pi-chart-line',
        command: () => {
          this.router.navigate(['/stats']);
        }
      },
    ];
  }

  getGroupedItemsArray(): [string, any[]][] {
    return Array.from(this.groupedItemsMap.entries());
  }

}

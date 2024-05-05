import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  itemFirebaseService = inject(ItemFirebaseService)
  router = inject(Router);

  items: MenuItem[] | undefined;
  groupedItems: any = {};

  ngOnInit() {
    this.itemFirebaseService.getItems().subscribe((items) => {
      items.forEach((item: any) => {
        if (!this.groupedItems[item.categoryName]) {
          this.groupedItems[item.categoryName] = [];
        }
        this.groupedItems[item.categoryName].push(item);
      });
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/list']);
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

  getKeys(): string[] {
    return Object.keys(this.groupedItems);
  }

}

/*
// Assuming itemsData is an array of items with category IDs
groupedItems: { [key: string]: Item[] } = { };

ngOnInit() {
  this.groupItemsByCategory();
}

groupItemsByCategory() {
  this.itemsData.forEach(item => {
    if (!this.groupedItems[item.categoryId]) {
      this.groupedItems[item.categoryId] = [];
    }
    this.groupedItems[item.categoryId].push(item);
  });
}

// Object.keys does not work inside an Angular template
<div *ngFor="let categoryId of Object.keys(groupedItems)">
  <h2>Category:{{ categoryId }}</h2>
    <ul>
    <li *ngFor="let item of groupedItems[categoryId]" >
      Item Name: {{ item.name }} - Category ID: {{ item.categoryId }}
    </li>
  </ul>
</div>
*/
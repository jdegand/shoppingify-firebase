import { Component, OnInit, inject } from '@angular/core';
import { CategoryFirebaseService } from '../../services/category/category-firebase.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf, TabMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categoryFirebaseService = inject(CategoryFirebaseService);
  router = inject(Router);

  categories$: any;

  items: MenuItem[] | undefined;

  tabitems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.categories$ = this.categoryFirebaseService.getCategories();


    this.tabitems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', tooltip: 'YEs' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
  ];


    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        tooltip: 'Home',
        tooltipPosition: 'left',
        command: () => {
          this.router.navigate(['/list']);
        }
      },
      {
        label: 'list',
        icon: 'pi pi-list',
        tooltip: 'List',
        tooltipPosition: 'right',
        command: () => {
          this.router.navigate(['/list']);
        }
      },
      {
        label: 'History',
        icon: 'pi pi-history',
        tooltip: 'History',
        tooltipPosition: 'right',
        command: () => {
          this.router.navigate(['/history']);
        }
      },
      {
        label: 'Stats',
        icon: 'pi pi-chart-line',
        tooltip: 'Stats',
        tooltipPosition: 'right',
        command: () => {
          this.router.navigate(['/stats']);
        }
      },
    ];

  }

}

/*
typescript
// Assuming itemsData is an array of items with category IDs
groupedItems: { [key: string]: Item[] } = {};

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

<div *ngFor="let categoryId of Object.keys(groupedItems)">
  <h2>Category: {{ categoryId }}</h2>
  <ul>
    <li *ngFor="let item of groupedItems[categoryId]">
      Item Name: {{ item.name }} - Category ID: {{ item.categoryId }}
    </li>
  </ul>
</div>

*/
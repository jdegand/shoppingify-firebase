import { Component, OnInit, inject } from '@angular/core';
import { CategoryFirebaseService } from '../../services/category/category-firebase.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, TieredMenuModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categoryFirebaseService = inject(CategoryFirebaseService);

  categories$: any;

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.categories$ = this.categoryFirebaseService.getCategories();

    this.items = [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            items: [
              {
                label: 'Document',
                icon: 'pi pi-file',
                shortcut: '⌘+N'
              },
              {
                label: 'Image',
                icon: 'pi pi-image',
                shortcut: '⌘+I'
              },
              {
                label: 'Video',
                icon: 'pi pi-video',
                shortcut: '⌘+L'
              }
            ]
          },
          {
            label: 'Open',
            icon: 'pi pi-folder-open',
            shortcut: '⌘+O'
          },
          {
            label: 'Print',
            icon: 'pi pi-print',
            shortcut: '⌘+P'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        items: [
          {
            label: 'Copy',
            icon: 'pi pi-copy',
            shortcut: '⌘+C'
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            shortcut: '⌘+D'
          }
        ]
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        shortcut: '⌘+S'
      },
      {
        separator: true
      },
      {
        label: 'Share',
        icon: 'pi pi-share-alt',
        items: [
          {
            label: 'Slack',
            icon: 'pi pi-slack',
            badge: '2'
          },
          {
            label: 'Whatsapp',
            icon: 'pi pi-whatsapp',
            badge: '3'
          }
        ]
      }
    ]

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
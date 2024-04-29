import { Component, OnInit, inject } from '@angular/core';
import { CategoryFirebaseService } from '../../services/category/category-firebase.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categoryFirebaseService = inject(CategoryFirebaseService);

  categories$: any;
  
  ngOnInit(): void {
    this.categories$ = this.categoryFirebaseService.getCategories();
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
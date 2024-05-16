import { Component, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);

  lists$: Observable<any> | undefined; // document data

  ngOnInit(): void {
    this.lists$ = this.shoppingListFirebaseService.getLists().pipe(
      map((data: any) => {

        const flattenedArray: any = [];

        // Loop over the array of objects and push the nested array to the flattened array
        data.forEach((obj: any) => {
          flattenedArray.push(...obj.items);
        });

        // Print the flattened array
        // console.log('flattened', flattenedArray);

        const reducedItems = flattenedArray.reduce((acc: any, item: any) => {
          if (acc[item.name]) {
            acc[item.name] += item.quantity;
          } else {
            acc[item.name] = item.quantity;
          }
          return acc;
        }, {});

        // console.log('reducedItems', reducedItems);

        // Convert the reduced items object to an array of objects
        const result = Object.keys(reducedItems).map(name => ({ name, quantity: reducedItems[name] }));

        // console.log('result', result);

        return result;
      })
    );

  }

}

import { Component, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable } from 'rxjs';
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
    this.lists$ = this.shoppingListFirebaseService.getLists();
  }

}

import { Component, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.css'
})
export class HistoryDetailComponent {

  id = "";

  item$: Observable<any> | undefined;

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.item$ = this.shoppingListFirebaseService.getListById(this.id);
    });
  }

}

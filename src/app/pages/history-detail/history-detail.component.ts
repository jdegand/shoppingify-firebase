import { Component, OnInit, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe, NgFor, DatePipe],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.css'
})
export class HistoryDetailComponent implements OnInit {

  id = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item$: Observable<any> | undefined; // Observable<DocumentSnapshot<DocumentData, DocumentData>>

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.item$ = this.shoppingListFirebaseService.getListById(this.id);
    });
  }

}

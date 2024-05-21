import { Component, OnInit, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterOutlet, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  // problem when you navigate back from child route using the history link 
  // in the sidepanel -> the history list doesn't load in

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);

  // couldn't use List until I changed date property
  lists$: Observable<List[]> | undefined;

  isChildComponentActive: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.firstChild?.paramMap.subscribe(params => {
      this.isChildComponentActive = params.get('id') ? true : false;
    });

    this.lists$ = this.shoppingListFirebaseService.getLists();
  }
 
}

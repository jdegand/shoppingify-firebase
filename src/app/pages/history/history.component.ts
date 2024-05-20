import { Component, OnInit, inject } from '@angular/core';
import { ShoppingListFirebaseService } from '../../services/shopping-list/shopping-list-firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterOutlet, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  shoppingListFirebaseService = inject(ShoppingListFirebaseService);

  // can't use List -> because of list.date.seconds in template
  // change date property of list?  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lists$: Observable<any> | undefined;

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

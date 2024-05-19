import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [NgIf, JsonPipe, AsyncPipe, DatePipe],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  id = "";

  item$: Observable<any> | undefined;

  itemFirebaseService = inject(ItemFirebaseService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.item$ = this.itemFirebaseService.getItemById(this.id);
    });
  }

}

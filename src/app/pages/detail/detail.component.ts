import { Component, OnInit, inject } from '@angular/core';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  /*
  // using withComponentInputBinding() causes issue where the component won't refresh
  // could look more into this but I changed implemenation and it works as intended

  @Input('id') id = '';
  itemFirebaseService = inject(ItemFirebaseService);
  item$: Observable<any> | undefined;
  
  ngOnInit() {
    this.item$ = this.itemFirebaseService.getItemById(this.id);
  }
  */

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

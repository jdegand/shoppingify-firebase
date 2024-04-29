import { TestBed } from '@angular/core/testing';

import { ShoppingListFirebaseService } from './shopping-list-firebase.service';

describe('ShoppingListFirebaseService', () => {
  let service: ShoppingListFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

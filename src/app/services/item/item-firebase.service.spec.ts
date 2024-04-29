import { TestBed } from '@angular/core/testing';

import { ItemFirebaseService } from './item-firebase.service';

describe('ItemFirebaseService', () => {
  let service: ItemFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

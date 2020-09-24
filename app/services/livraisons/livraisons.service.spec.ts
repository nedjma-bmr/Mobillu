import { TestBed } from '@angular/core/testing';

import { LivraisonsService } from './livraisons.service';

describe('LivraisonsService', () => {
  let service: LivraisonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivraisonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

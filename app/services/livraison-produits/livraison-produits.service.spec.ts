import { TestBed } from '@angular/core/testing';

import { LivraisonProduitsService } from './livraison-produits.service';

describe('LivraisonProduitsService', () => {
  let service: LivraisonProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivraisonProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

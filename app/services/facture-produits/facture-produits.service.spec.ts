import { TestBed } from '@angular/core/testing';

import { FactureProduitsService } from './facture-produits.service';

describe('FactureProduitsService', () => {
  let service: FactureProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

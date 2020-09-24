import { TestBed } from '@angular/core/testing';

import { DevisProduitsService } from './devis-produits.service';

describe('DevisProduitsService', () => {
  let service: DevisProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

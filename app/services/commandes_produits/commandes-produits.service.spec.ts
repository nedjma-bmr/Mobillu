import { TestBed } from '@angular/core/testing';

import { CommandesProduitsService } from './commandes-produits.service';

describe('CommandesProduitsService', () => {
  let service: CommandesProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandesProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

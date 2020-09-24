import { TestBed } from '@angular/core/testing';

import { ModePaimentService } from './mode-paiment.service';

describe('ModePaimentService', () => {
  let service: ModePaimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModePaimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EtablishmentService } from './etablishment.service';

describe('EtablishmentService', () => {
  let service: EtablishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtablishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

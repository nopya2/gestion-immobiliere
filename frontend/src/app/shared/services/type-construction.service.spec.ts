import { TestBed } from '@angular/core/testing';

import { TypeConstructionService } from './type-construction.service';

describe('TypeConstructionService', () => {
  let service: TypeConstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeConstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

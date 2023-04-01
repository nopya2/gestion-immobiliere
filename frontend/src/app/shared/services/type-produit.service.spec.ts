import { TestBed } from '@angular/core/testing';

import { TypeProduitService } from './type-produit.service';

describe('TypeProduitService', () => {
  let service: TypeProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

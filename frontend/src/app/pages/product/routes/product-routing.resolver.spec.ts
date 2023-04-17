import { TestBed } from '@angular/core/testing';

import { ProductRoutingResolver } from './product-routing.resolver';

describe('ProductRoutingResolver', () => {
  let resolver: ProductRoutingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductRoutingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

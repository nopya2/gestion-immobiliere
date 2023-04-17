import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Product } from '@app/shared/interfaces/product.type';
import { ProductService } from '@app/shared/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRoutingResolver implements Resolve<Product | null> {
  constructor(protected service: ProductService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((product: HttpResponse<Product>) => {
          if (product.body) {
            return of(product.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}

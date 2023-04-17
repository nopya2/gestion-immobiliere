import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Product } from '../interfaces/product.type';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

const API_URL = "api/products";
export type EntityResponseType = HttpResponse<Product>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { 
  }

  getAll(params: any){    
    return this.http.get<any>(`${environment.endpoint}/${API_URL}`, {
      params: params
    });
  }

  getOne(id){
    return this.http.get<any>(`${environment.endpoint}/${API_URL}/${id}`)
        .pipe(map((product: Product) => {
            return product;
        }));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<Product>(`${environment.endpoint}/${API_URL}/${id}`, { observe: 'response' });
  }

  create(data: Product){
    data.user = `/api/users/${this.auth.currentUserValue.id}`;
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((product: Product) => {
            return product;
        }));
  }

  createWithFormData(formData: FormData){
    formData.append('user', `/api/users/${this.auth.currentUserValue.id}`);
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, formData)
        .pipe(map((product: Product) => {
            return product;
        }));
  }

  update(data: Product){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((product: Product) => {
            return product;
        }));
  }

  patch(data: Product){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((product: Product) => {
            return product;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }

  addProductImage(product: Product, formData){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}/${product.id}/image`, formData)
        .pipe(map((product: Product) => {
            return product;
        }));
  }
}

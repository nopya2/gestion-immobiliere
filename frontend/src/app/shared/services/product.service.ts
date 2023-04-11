import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Product } from '../interfaces/product.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/products";

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

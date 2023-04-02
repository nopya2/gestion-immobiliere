import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Customer } from '../interfaces/customer.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/customers";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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
        .pipe(map((customer: Customer) => {
            return customer;
        }));
  }

  create(data: Customer){
    data.user = `/api/users/${this.auth.currentUserValue.id}`;
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((customer: Customer) => {
            return customer;
        }));
  }

  update(data: Customer){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((customer: Customer) => {
            return customer;
        }));
  }

  patch(data: Customer){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((customer: Customer) => {
            return customer;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

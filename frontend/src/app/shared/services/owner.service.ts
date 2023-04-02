import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Owner } from '../interfaces/owner.type';

const API_URL = "api/owners";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(params: any){
    return this.http.get<any>(`${environment.endpoint}/${API_URL}`, {
      params: params
    });
  }

  getOne(id){
    return this.http.get<any>(`${environment.endpoint}/${API_URL}/${id}`)
        .pipe(map((owner: Owner) => {
            return owner;
        }));
  }

  create(data: Owner){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((owner: Owner) => {
            return owner;
        }));
  }

  update(data: Owner){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((owner: Owner) => {
            return owner;
        }));
  }

  patch(data: Owner){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((owner: Owner) => {
            return owner;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

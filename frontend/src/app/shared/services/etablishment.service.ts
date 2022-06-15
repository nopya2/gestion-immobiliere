import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Etablishment } from '../interfaces/etablishment.type';

const API_URL = "api/etablishments";

@Injectable({
  providedIn: 'root'
})
export class EtablishmentService {

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
        .pipe(map((etablishment: Etablishment) => {
            return etablishment;
        }));
  }

  create(data: Etablishment){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((etablishment: Etablishment) => {
            return etablishment;
        }));
  }

  update(data: Etablishment){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((etablishment: Etablishment) => {
            return etablishment;
        }));
  }

  patch(data: Etablishment){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((etablishment: Etablishment) => {
            return etablishment;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

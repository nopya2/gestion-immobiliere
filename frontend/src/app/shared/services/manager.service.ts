import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Manager } from '../interfaces/manager.type';

const API_URL = "api/managers";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

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
        .pipe(map((manager: Manager) => {
            return manager;
        }));
  }

  create(data: Manager){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((manager: Manager) => {
            return manager;
        }));
  }

  update(data: Manager){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((manager: Manager) => {
            return manager;
        }));
  }

  patch(data: Manager){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((manager: Manager) => {
            return manager;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

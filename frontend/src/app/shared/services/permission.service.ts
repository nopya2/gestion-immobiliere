import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Permission } from '@app/shared/interfaces/global.type';

const API_URL = "api/permissions";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

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
        .pipe(map((permission: Permission) => {
            return permission;
        }));
  }

  create(data: Permission){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((permission: Permission) => {
            return permission;
        }));
  }

  update(data: Permission){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((permission: Permission) => {
            return permission;
        }));
  }

  patch(data: Permission){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((permission: Permission) => {
            return permission;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

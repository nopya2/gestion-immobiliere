import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Module } from '@app/shared/interfaces/global.type';

const API_URL = "api/modules";


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

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
        .pipe(map((module: Module) => {
            return module;
        }));
  }

  create(data: Module){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((module: Module) => {
            return module;
        }));
  }

  update(data: Module){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((module: Module) => {
            return module;
        }));
  }

  patch(data: Module){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((module: Module) => {
            return module;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

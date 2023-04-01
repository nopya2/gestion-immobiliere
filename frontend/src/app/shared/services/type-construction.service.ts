import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { TypeConstruction } from '../interfaces/type-construction';

const API_URL = "api/type_constructions";

@Injectable({
  providedIn: 'root'
})
export class TypeConstructionService {

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
        .pipe(map((typeConstruction: TypeConstruction) => {
            return typeConstruction;
        }));
  }

  create(data: TypeConstruction){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((typeConstruction: TypeConstruction) => {
            return typeConstruction;
        }));
  }

  update(data: TypeConstruction){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((typeConstruction: TypeConstruction) => {
            return typeConstruction;
        }));
  }

  patch(data: TypeConstruction){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((typeConstruction: TypeConstruction) => {
            return typeConstruction;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

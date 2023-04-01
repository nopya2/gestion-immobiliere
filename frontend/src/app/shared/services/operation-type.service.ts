import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { OperationType } from '../interfaces/operation-type.type';

const API_URL = "api/operation_types";

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {

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
        .pipe(map((operationType: OperationType) => {
            return operationType;
        }));
  }

  create(data: OperationType){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((operationType: OperationType) => {
            return operationType;
        }));
  }

  update(data: OperationType){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((operationType: OperationType) => {
            return operationType;
        }));
  }

  patch(data: OperationType){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((operationType: OperationType) => {
            return operationType;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

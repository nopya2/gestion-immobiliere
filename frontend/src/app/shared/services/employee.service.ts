import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Employee } from '../interfaces/employee.type';

const API_URL = "api/employees";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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
        .pipe(map((employee: Employee) => {
            return employee;
        }));
  }

  create(data: Employee){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((employee: Employee) => {
            return employee;
        }));
  }

  update(data: Employee){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((employee: Employee) => {
            return employee;
        }));
  }

  patch(data: Employee){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((employee: Employee) => {
            return employee;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Department } from '@app/shared/interfaces/department.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/departments";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getAll(params: any){
    return this.http.get<any>(`${environment.endpoint}/${API_URL}`, {
      params: params
    });
  }

  getOne(id){
    return this.http.get<any>(`${environment.endpoint}/${API_URL}/${id}`)
        .pipe(map((department: Department) => {
            return department;
        }));
  }

  create(data: Department){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((department: Department) => {
            return department;
        }));
  }

  update(data: Department){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((department: Department) => {
            return department;
        }));
  }

  patch(data: Department){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((department: Department) => {
            return department;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

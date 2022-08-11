import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Cycle } from '../interfaces/level.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/cycles";

@Injectable({
  providedIn: 'root'
})
export class CycleService {

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
        .pipe(map((cycle: Cycle) => {
            return cycle;
        }));
  }

  create(data: Cycle){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((cycle: Cycle) => {
            return cycle;
        }));
  }

  update(data: Cycle){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((cycle: Cycle) => {
            return cycle;
        }));
  }

  patch(data: Cycle){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((cycle: Cycle) => {
            return cycle;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

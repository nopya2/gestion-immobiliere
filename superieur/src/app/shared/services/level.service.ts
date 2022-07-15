import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Level } from '../interfaces/level.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/levels";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

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
        .pipe(map((level: Level) => {
            return level;
        }));
  }

  create(data: Level){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((level: Level) => {
            return level;
        }));
  }

  update(data: Level){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((level: Level) => {
            return level;
        }));
  }

  patch(data: Level){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((level: Level) => {
            return level;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { LevelType } from '../interfaces/level.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/level_types";

@Injectable({
  providedIn: 'root'
})
export class LevelTypeService {

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
        .pipe(map((levelType: LevelType) => {
            return levelType;
        }));
  }

  create(data: LevelType){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((levelType: LevelType) => {
            return levelType;
        }));
  }

  update(data: LevelType){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((levelType: LevelType) => {
            return levelType;
        }));
  }

  patch(data: LevelType){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((levelType: LevelType) => {
            return levelType;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

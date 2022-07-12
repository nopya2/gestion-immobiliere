import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Diploma } from '../interfaces/diploma.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/diplomas";

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {

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
        .pipe(map((diploma: Diploma) => {
            return diploma;
        }));
  }

  create(data: Diploma){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((diploma: Diploma) => {
            return diploma;
        }));
  }

  update(data: Diploma){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((diploma: Diploma) => {
            return diploma;
        }));
  }

  patch(data: Diploma){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((diploma: Diploma) => {
            return diploma;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

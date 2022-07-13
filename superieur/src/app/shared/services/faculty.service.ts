import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { Faculty } from '@app/shared/interfaces/faculty.type';
import { AuthenticationService } from './authentication.service';

const API_URL = "api/faculties";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

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
        .pipe(map((faculty: Faculty) => {
            return faculty;
        }));
  }

  create(data: Faculty){
    data['etablishment'] = this.authService.currentUserValue.etablishment;
    
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((faculty: Faculty) => {
            return faculty;
        }));
  }

  update(data: Faculty){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((faculty: Faculty) => {
            return faculty;
        }));
  }

  patch(data: Faculty){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((faculty: Faculty) => {
            return faculty;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

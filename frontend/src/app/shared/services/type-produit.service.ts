import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { TypeProduit } from '../interfaces/type-produit.type';

const API_URL = "api/type_produits";

@Injectable({
  providedIn: 'root'
})
export class TypeProduitService {

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
        .pipe(map((typeProduit: TypeProduit) => {
            return typeProduit;
        }));
  }

  create(data: TypeProduit){
    return this.http.post<any>(`${environment.endpoint}/${API_URL}`, data)
        .pipe(map((typeProduit: TypeProduit) => {
            return typeProduit;
        }));
  }

  update(data: TypeProduit){
    return this.http.put<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((typeProduit: TypeProduit) => {
            return typeProduit;
        }));
  }

  patch(data: TypeProduit){
    return this.http.patch<any>(`${environment.endpoint}/${API_URL}/${data.id}`, data)
        .pipe(map((typeProduit: TypeProduit) => {
            return typeProduit;
        }));
  }

  delete(id){
    return this.http.delete<any>(`${environment.endpoint}/${API_URL}/${id}`);
  }
}

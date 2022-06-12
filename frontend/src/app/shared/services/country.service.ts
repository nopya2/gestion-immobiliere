import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}
 
  getCountries() {
    return this.http
      .get('assets/data/countries.json')
      .pipe(map((countries) => countries || []));
  }
}

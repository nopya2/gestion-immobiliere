import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from "../../../environments/environment";

import { User } from '../interfaces/user.type';
import { Employee } from '../interfaces/employee.type';

const USER_AUTH_API_URL = '/api-url';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    endpoint = environment.endpoint;

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any{
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.endpoint}/api/employee/login`, { email, password })
        .pipe(map(user => {
            console.log(user);
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/authentication/login');
    }

    verify() {
        this.http.get(`${this.endpoint}/api/verify`)
            .subscribe(res => {

            }, err => {
                this.logout();
            });
    }

    public hasPermission(roles: string[]): boolean{
        return true;
        for(let i=0; i < roles.length; i++){
            let found = this.currentUserValue.roles.find(el => el === roles[i]);
            if(found !== undefined)
                return true;
        }
        return false;
    }
}
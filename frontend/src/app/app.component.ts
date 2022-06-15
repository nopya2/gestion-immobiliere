import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";

import { AuthenticationService } from './shared/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    currentRoute: string;

    constructor(
        private router: Router,
        private authService: AuthenticationService){
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // Show progress spinner or progress bar
                console.log('Route change detected');
                //On verifie si le token existe de maniere locale
                let currentUser = this.authService.currentUserValue;
                if (currentUser && currentUser.token) {
                    // On verifie si le token n'est pas encore expire
                    // this.authService.verify();
                }else{
                    // this.authService.logout();
                }
            }
    
            if (event instanceof NavigationEnd) {
                // Hide progress spinner or progress bar
                this.currentRoute = event.url;
                let currentUser = this.authService.currentUserValue;
                if (currentUser && currentUser.token) {
                    // On verifie si le token n'est pas encore expire
                    if(this.currentRoute !== '/authentication/login-1')
                        this.authService.verify();
                    else{
                        this.router.navigateByUrl('/dashboard/default');
                    }
                }else{
                    if(this.currentRoute !== '/authentication/login-1')
                        this.authService.logout();
                }         
                console.log(event);
            }
    
            if (event instanceof NavigationError) {
                 // Hide progress spinner or progress bar
    
                // Present error to user
                console.log(event.error);
            }
        });
    }
}

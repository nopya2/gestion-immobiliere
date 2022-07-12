import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

import { AuthenticationService } from "../../shared/services/authentication.service";
import { TestService } from "../../../app/test.service";


@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
    loginForm: FormGroup;
    isLoading: Boolean = false;

    constructor(
        private fb: FormBuilder,
        private test: TestService,
        private authService: AuthenticationService,
        private notification: NzNotificationService,
        private router: Router
        ) {
    }

    submitForm(): void {
        this.isLoading = true;
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[ i ].markAsDirty();
            this.loginForm.controls[ i ].updateValueAndValidity();
        }

        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(response => {
                this.isLoading = false;
                this.notification.success("Succès", "Connexion réussie!");
                this.router.navigateByUrl("/");
            }, error => {
                this.notification.error("Echec connexion", "Login ou mot de passse invalide!")
                this.isLoading = false;
            })
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
}    
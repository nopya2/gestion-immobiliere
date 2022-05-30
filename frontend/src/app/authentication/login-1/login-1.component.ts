import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { AuthenticationService } from "../../shared/services/authentication.service";
import { TestService } from "../../../app/test.service";


@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
    loginForm: FormGroup;
    isLoading: Boolean = false;

    submitForm(): void {
        this.isLoading = true;
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[ i ].markAsDirty();
            this.loginForm.controls[ i ].updateValueAndValidity();
        }

        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(response => {
                this.isLoading = false;
                console.log(response);
            }, error => {
                console.log(error);
                this.isLoading = false;
            })
    }

    constructor(
        private fb: FormBuilder,
        private test: TestService,
        private authService: AuthenticationService
        ) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
}    
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {


    isLoginMode: boolean = true;
    // API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=';
    // TOKEN: string = 'AIzaSyCL3-vbY9XE8zj0zRxaQwII3Acl31_zoUQ';
    // URL: string = this.API + this.TOKEN;

    constructor(private AuthService: AuthService) { }

    ngOnInit(): void {
        // console.log('URL: ', this.URL);
    }

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm): void {
        console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email: string = form.value.email;
        const password: string = form.value.password;

        if (this.isLoginMode) {
            // ...
        } else {
            this.AuthService.signup(email, password).subscribe(
                resData => {
                    console.log(resData);
                },
                error => {
                    console.error(error);
                });
        }

        form.reset();
    }
}
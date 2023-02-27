import { ElementSchemaRegistry } from "@angular/compiler";
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
    isLoading: boolean = false;
    error: string | null = null;


    constructor(private AuthService: AuthService) { }

    ngOnInit(): void {

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

        this.isLoading = true;
        if (this.isLoginMode) {
            // ...
        } else {
            this.AuthService.signup(email, password).subscribe(
                resData => {
                    console.log(resData);
                    this.isLoading = false;
                },
                errorMessage => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                });
        }

        form.reset();
    }
}
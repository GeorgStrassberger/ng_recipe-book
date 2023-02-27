import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthResponseData } from "../shared/auth-response-data";

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    SIGN_UP_API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    LOGIN_API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    TOKEN: string = 'AIzaSyCL3-vbY9XE8zj0zRxaQwII3Acl31_zoUQ';


    constructor(private http: HttpClient) { }


    signup(email: string, password: string,): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.SIGN_UP_API + this.TOKEN,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            this.LOGIN_API + this.TOKEN,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage: string = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return throwError(errorMessage);
    }
}
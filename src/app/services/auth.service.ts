import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthResponseData } from "../shared/auth-response-data";

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    TOKEN: string = 'AIzaSyCL3-vbY9XE8zj0zRxaQwII3Acl31_zoUQ';
    URL: string = this.API + this.TOKEN;

    constructor(private http: HttpClient) { }


    signup(email: string, password: string,): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.URL,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(errorRes => {
                let errorMessage: string = 'An unknown error occurred!';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already!';
                }
                return throwError(errorMessage);
            }));
    }
}
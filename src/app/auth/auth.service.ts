import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError, BehaviorSubject } from "rxjs";
import { AuthResponseData } from "../shared/auth-response-data";
import { User } from "../shared/user.model";

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    //Firebase
    SIGN_UP_API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    LOGIN_API: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    TOKEN: string = 'AIzaSyCL3-vbY9XE8zj0zRxaQwII3Acl31_zoUQ';

    user: BehaviorSubject<User> = new BehaviorSubject<User>(null!);
    private tokenExpirationTimer: NodeJS.Timeout | null = null;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    signup(email: string, password: string,): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.SIGN_UP_API + this.TOKEN,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(this.handleError),
            tap((resData: AuthResponseData): void => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
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
            catchError(this.handleError),
            tap((resData: AuthResponseData): void => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    autoLogin(): void {
        const ls: string | null = localStorage.getItem('userData');
        if (ls) {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(ls);

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                this.user.next(loadedUser);
                const tokenExpirationDateInMilliseconds: number = new Date(userData._tokenExpirationDate).getTime();
                const currentDateInMilliseconds: number = new Date().getTime();
                const expirationDuration: number = tokenExpirationDateInMilliseconds - currentDateInMilliseconds;
                this.autoLogout(expirationDuration);
            }
        } else {
            return;
        }
    }

    logout(): void {
        this.user.next(null!);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expiratenDate: number): void {
        console.log('expiratenDate: ', expiratenDate);
        this.tokenExpirationTimer = setTimeout((): void => {
            this.logout();
        }, expiratenDate);
    }


    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ): void {
        const expiresInMilliseconds: number = expiresIn * 1000;
        const expiratenDate = new Date(new Date().getTime() + expiresInMilliseconds);
        const user = new User(
            email,
            userId,
            token,
            expiratenDate
        );
        this.user.next(user);
        this.autoLogout(expiresInMilliseconds);
        localStorage.setItem('userData', JSON.stringify(user));
    };


    private handleError(errorRes: HttpErrorResponse): Observable<never> {
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
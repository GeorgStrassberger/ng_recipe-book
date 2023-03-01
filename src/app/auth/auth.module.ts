import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'auth', component: AuthComponent }
        ]),
        SharedModule,
    ],
    exports: [
        AuthComponent,
        ReactiveFormsModule,
    ],
})

export class AuthModule { }
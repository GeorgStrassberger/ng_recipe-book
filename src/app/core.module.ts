import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthIntercepterService } from "./auth/auth-interceptor.service";
import { AuthService } from "./auth/auth.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppinglistService } from "./shopping-list/shoppinglist.service";

@NgModule({
    providers: [
        ShoppinglistService,
        RecipeService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true }
    ],
})
export class CoreModule { }
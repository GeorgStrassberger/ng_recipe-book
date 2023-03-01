import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from "./header/header.component";
import { ShoppinglistService } from "./shopping-list/shoppinglist.service";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeService } from "./recipes/recipe.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthIntercepterService } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
  ],
  providers: [
    ShoppinglistService,
    RecipeService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

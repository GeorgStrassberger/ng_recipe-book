import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

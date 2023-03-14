import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";
import { Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  // private subscription!: Subscription;

  constructor(
    private shoppingService: ShoppinglistService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
  ) {

  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.subscription = this.shoppingService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]): void => {
    //     this.ingredients = ingredients;
    //   },
    // )
  }

  onEditItem(index: number): void {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}

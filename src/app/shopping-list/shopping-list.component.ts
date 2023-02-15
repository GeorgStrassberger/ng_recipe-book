import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService} from "../services/shoppinglist.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private subscription!: Subscription;
  constructor( public shoppingService: ShoppinglistService){ }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      },
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

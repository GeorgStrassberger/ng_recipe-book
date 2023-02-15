import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService} from "../services/shoppinglist.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor(
    public shoppingService: ShoppinglistService,
  ){ }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      },
    )
  }


}

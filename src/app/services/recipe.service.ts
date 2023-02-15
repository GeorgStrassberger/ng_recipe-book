import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "../shared/resipe.model";
import { ShoppinglistService } from "../services/shoppinglist.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Wiener Schnitzel',
      'mit Preiselbeeren und Pommes',
      '../../assets/img/recipe-icon.png',
      [
        new Ingredient(
          'Meat',
          1),
        new Ingredient(
          'French Fries',
          30
          )
      ]
    ),
    new Recipe(
      'Chilli Con Carne',
      'nach Ungarischer Art, sehr scharf, ',
      '../../assets/img/recipe-icon.png',
      [
        new Ingredient(
          'Beans',
          1),
        new Ingredient(
          'Chilli',
          2),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppinglistService) { }

  /**
   * returns a copy of the recipes array
   */
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}

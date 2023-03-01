import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./resipe.model";
import { ShoppinglistService } from "../shopping-list/shoppinglist.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [];

  private recipes: Recipe[] = [
    new Recipe(
      'Wiener Schnitzel',
      'mit Preiselbeeren und Pommes',
      '../../assets/img/schnitzel_640.jpg',
      [
        new Ingredient(
          'Meat',
          2),
        new Ingredient(
          'French Fries',
          30
        ),
        new Ingredient(
          'Lemon',
          1
        )
      ]
    ),
    new Recipe(
      'Chilli Con Carne',
      'nach Ungarischer Art, sehr scharf, ',
      '../../assets/img/chili-con-carne_640.jpg',
      [
        new Ingredient(
          'Beans',
          1),
        new Ingredient(
          'minced meat',
          500
        ),
        new Ingredient(
          'Chilli',
          2
        ),
        new Ingredient(
          'Corn',
          1
        )
      ]
    ),
    new Recipe(
      'Pancakes',
      'american style',
      '../../assets/img/pancakes_640.jpg',
      [
        new Ingredient(
          'Flour',
          500
        ),
        new Ingredient(
          'Milk',
          1
        ),
        new Ingredient(
          'Suger',
          100
        ),
        new Ingredient(
          'maple syrup',
          1
        ),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppinglistService) { }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * returns a copy of the recipes array
   */
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}

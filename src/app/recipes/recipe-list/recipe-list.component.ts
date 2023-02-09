import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Recipe} from "../../shared/resipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Wiener Schnitzel',
      'mit Preiselbeeren und Pommes',
      '../../assets/img/recipe-icon.png'
    ),
    new Recipe(
      'Chilli Con Carne',
      'nach Ungarischer Art, sehr scharf, ',
      '../../assets/img/recipe-icon.png'
    ),
  ];

  constructor(){ }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
  }

}

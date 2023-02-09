import { Component } from '@angular/core';
import { Recipe } from '../shared/resipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  selectedRecipe!: Recipe;

  fn(){

  }


}

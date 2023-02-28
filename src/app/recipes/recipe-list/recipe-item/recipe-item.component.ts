import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from "../../resipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe!: Recipe;
  @Input() index: number = 0;
  ngOnInit(): void {
  }

}

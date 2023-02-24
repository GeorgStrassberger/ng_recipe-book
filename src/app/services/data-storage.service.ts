import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../shared/resipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root',
})

export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
    ) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http
            .put(
                'https://recipe-book-16779-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }
}
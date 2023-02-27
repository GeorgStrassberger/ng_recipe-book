import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { Recipe } from "../shared/resipe.model";
import { User } from "../shared/user.model";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root',
})

export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService,
    ) { }

    storeRecipes(): void {
        const recipes: Recipe[] = this.recipesService.getRecipes();
        this.http
            .put<Recipe[]>(
                'https://recipe-book-16779-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }


    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://recipe-book-16779-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
            )
            .pipe(
                map((recipes: Recipe[]) => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            );
    }
}
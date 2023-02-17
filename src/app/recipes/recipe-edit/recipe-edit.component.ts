import { Component } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService:RecipeService){ }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    console.log(this.recipeForm);
  }
  private initForm():void{
    let recipeName:string = '';
    let recipeImagePath:string = '';
    let recipeDescription:string = '';
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }


}

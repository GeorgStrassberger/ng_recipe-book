import {Component, ElementRef, ViewChild } from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppinglistService} from "../../services/shoppinglist.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', {static: false}) nameInputRef!: ElementRef;
  @ViewChild('amountInput', {static: false}) nameAmountRef!: ElementRef;

  constructor(
    private shoppingService: ShoppinglistService,
  ){ }
  onAddItem(){
    const ING_NAME = this.nameInputRef.nativeElement.value;
    const ING_AMOUNT = this.nameAmountRef.nativeElement.value;
    const INSTANZ_OF_INGREDIENT = new Ingredient(ING_NAME, ING_AMOUNT);
    this.shoppingService.addIngredient(INSTANZ_OF_INGREDIENT);
  }



}

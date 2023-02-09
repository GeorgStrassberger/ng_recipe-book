import {Component, ElementRef, ViewChild, EventEmitter,Output } from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', {static: false}) nameInputRef!: ElementRef;
  @ViewChild('amountInput', {static: false}) nameAmountRef!: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  onAddItem(){
    const ING_NAME = this.nameInputRef.nativeElement.value;
    const ING_AMOUNT = this.nameAmountRef.nativeElement.value;
    const INSTANZ_OF_INGREDIENT = new Ingredient(ING_NAME, ING_AMOUNT);
    this.ingredientAdded.emit(INSTANZ_OF_INGREDIENT);
  }



}

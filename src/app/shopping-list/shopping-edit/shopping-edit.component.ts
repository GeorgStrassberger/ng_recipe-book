import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppinglistService } from "../shoppinglist.service";
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex?: number;
  editedItem?: Ingredient;
  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number): void => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingListForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    );
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const INGREDIENT = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex!, INGREDIENT)
    } else {
      this.shoppingService.addIngredient(INGREDIENT);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex!);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

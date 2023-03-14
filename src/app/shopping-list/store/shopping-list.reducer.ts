import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

// initalstate = UrsprungsWert
const initaleState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
}

// state ist der original wert vor der änderung, action ist die änderung was den reducer updated 
export function shoppingListReducer(
    state = initaleState,
    action: ShoppingListActions.AddIngredient
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        default:
            return state;
    }
}
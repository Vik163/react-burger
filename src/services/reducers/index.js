import { combineReducers } from 'redux';

import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { burgerIngredientsCardReducer } from './burger-ingredients-card';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerIngredientsCard: burgerIngredientsCardReducer,
  orderDetails: orderDetailsReducer,
});

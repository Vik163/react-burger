import { combineReducers } from 'redux';

import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { registerReducer } from './register';
import { authorizationReducer } from './authorization';
import { updateTokenReducer } from './update-token';
import { usersReducer } from './data-user';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  registerInfo: registerReducer,
  authorizationInfo: authorizationReducer,
  updateToken: updateTokenReducer,
  dataUser: usersReducer,
});

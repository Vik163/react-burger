import { combineReducers } from 'redux';

import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { authorizationReducer } from './authorization';
import { usersReducer } from './data-user';
import { wsOrderFeedReducer } from './ws-order-feed';
import { wsOrdersProfileReducer } from './ws-orders-profile';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  authorizationInfo: authorizationReducer,
  dataUser: usersReducer,
  orderFeed: wsOrderFeedReducer,
  ordersProfile: wsOrdersProfileReducer,
});

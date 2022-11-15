import { INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from './constants';

export function setIngredientDetails(ingredientDetails) {
  return function (dispatch) {
    dispatch({
      type: INGREDIENT_DETAILS,
      ingredientDetails: ingredientDetails,
    });
  };
}

export function deleteIngredientDetails() {
  return function (dispatch) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
      ingredientDetails: {},
    });
  };
}

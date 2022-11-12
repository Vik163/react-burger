export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS ';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS ';

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

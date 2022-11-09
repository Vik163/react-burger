export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS ';

export function setIngredientDetails(ingredientDetails) {
  return function (dispatch) {
    dispatch({
      type: INGREDIENT_DETAILS,
      ingredientDetails: ingredientDetails,
    });
  };
}

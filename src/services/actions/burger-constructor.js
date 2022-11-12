export const DATA_INGREDIENTS = 'DATA_INGREDIENTS';
export const DATA_BUN = 'DATA_BUN';

export function setBun({ bun }) {
  return function (dispatch) {
    dispatch({
      type: 'DATA_BUN',
      bun: bun,
    });
  };
}

export function setIngredients({ ingredients }) {
  return function (dispatch) {
    dispatch({
      type: 'DATA_INGREDIENTS',
      ingredients: ingredients,
    });
  };
}

import { DATA_INGREDIENTS, DATA_BUN } from './constants';

export function setBun({ bun }) {
  return function (dispatch) {
    dispatch({
      type: DATA_BUN,
      bun: bun,
    });
  };
}

export function setIngredients({ ingredients }) {
  return function (dispatch) {
    dispatch({
      type: DATA_INGREDIENTS,
      ingredients: ingredients,
    });
  };
}

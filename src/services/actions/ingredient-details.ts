import { INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from './constants';
import { TCard } from '../../utils/types';

export function setIngredientDetails(ingredientDetails: TCard) {
  localStorage.setItem('card', JSON.stringify(ingredientDetails));

  return {
    type: INGREDIENT_DETAILS,
    ingredientDetails: ingredientDetails,
  };
}

export function deleteIngredientDetails() {
  localStorage.removeItem('card');

  return {
    type: DELETE_INGREDIENT_DETAILS,
    ingredientDetails: {},
  };
}

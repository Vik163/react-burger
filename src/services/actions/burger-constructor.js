import { DATA_INGREDIENTS, DATA_BUN } from './constants';

export function setBun({ bun }) {
  bun
    ? localStorage.setItem('bun', JSON.stringify(bun))
    : localStorage.removeItem('bun');
  return {
    type: DATA_BUN,
    bun: bun,
  };
}

export function setIngredients({ ingredients }) {
  !ingredients[0]
    ? localStorage.removeItem('ingredients')
    : localStorage.setItem('ingredients', JSON.stringify(ingredients));

  return {
    type: DATA_INGREDIENTS,
    ingredients: ingredients,
  };
}

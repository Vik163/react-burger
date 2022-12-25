import { DATA_INGREDIENTS, DATA_BUN } from './constants';

import { TCard } from '../../utils/types';

export type TDataIngredients = {
  readonly type: typeof DATA_INGREDIENTS;
  readonly ingredients: Array<TCard> | [];
};

export type TDataBun = {
  readonly type: typeof DATA_BUN;
  readonly bun: TCard | null;
};

export type TBurgerConstructor = TDataIngredients | TDataBun;

type TBun = {
  bun: TCard | null;
};

type TIngredients = {
  ingredients: Array<TCard>;
};

export function setBun({ bun }: TBun) {
  bun
    ? localStorage.setItem('bun', JSON.stringify(bun))
    : localStorage.removeItem('bun');
  return {
    type: DATA_BUN,
    bun: bun,
  };
}

export function setIngredients({ ingredients }: TIngredients) {
  !ingredients[0]
    ? localStorage.removeItem('ingredients')
    : localStorage.setItem('ingredients', JSON.stringify(ingredients));

  return {
    type: DATA_INGREDIENTS,
    ingredients: ingredients,
  };
}

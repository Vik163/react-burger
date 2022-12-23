import {
  DATA_INGREDIENTS,
  DATA_BUN,
  CARD_ORDER,
  CARD_MOVE,
} from '../actions/constants';
import { TConstructorInitialState } from './reducers-types';
import { TTypesActions } from '../actions/actions-types';

const initialState: TConstructorInitialState = {
  cardOrder: null,
  bun: JSON.parse(localStorage.getItem('bun') as string) || null,
  ingredients: JSON.parse(localStorage.getItem('ingredients') as string) || [],
  dragIndex: null,
  hoverIndex: null,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TTypesActions
): TConstructorInitialState => {
  switch (action.type) {
    case CARD_MOVE:
      const ingredients = [...state.ingredients];

      ingredients.splice(
        action.dragIndex,
        0,
        ingredients.splice(action.hoverIndex, 1)[0]
      );

      return {
        ...state,
        ingredients: ingredients,
      };
    case DATA_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case DATA_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case CARD_ORDER: {
      return {
        ...state,
        cardOrder: action.cardOrder,
      };
    }
    default: {
      return state;
    }
  }
};

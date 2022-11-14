import { DATA_INGREDIENTS, DATA_BUN } from '../actions/burger-constructor';
import { CARD_ORDER } from '../actions/burger-constructor-card';
import {
  MODAL_CONSTRUCTOR_OPEN,
  MODAL_CONSTRUCTOR_CLOSE,
} from '../actions/modal';
import { CARD_MOVE } from '../actions/move-item';

const initialState = {
  cardOrder: null,
  bun: null,
  ingredients: [],
  isOpenConstructor: false,
  dragIndex: null,
  hoverIndex: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
    case MODAL_CONSTRUCTOR_OPEN:
      return {
        ...state,
        isOpenConstructor: true,
      };
    case MODAL_CONSTRUCTOR_CLOSE:
      return {
        ...state,
        isOpenConstructor: false,
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

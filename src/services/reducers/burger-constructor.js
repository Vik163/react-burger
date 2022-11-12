import { DATA_INGREDIENTS, DATA_BUN } from '../actions/burger-constructor';
import { CARD_ORDER } from '../actions/burger-constructor-card';
import {
  MODAL_CONSTRUCTOR_OPEN,
  MODAL_CONSTRUCTOR_CLOSE,
} from '../actions/modal';

const initialState = {
  bun: null,
  cardOrder: null,
  ingredients: [],
  isOpenConstructor: false,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
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

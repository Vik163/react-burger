import {
  DATA_INGREDIENTS,
  DATA_BUN,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from '../actions/burger-constructor';
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
  dataOrderRequest: false,
  dataOrderFailed: false,
  resultOrder: null,
  statusRequest: null,
  messageError: '',
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
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        dataOrderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        dataOrderFailed: false,
        // dataOrder: action.cards,
        dataOrderRequest: false,
        resultOrder: action.resultOrder,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        dataOrderFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        dataOrderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
